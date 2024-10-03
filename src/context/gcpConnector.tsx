import React, { createContext, useContext, useCallback, useState } from 'react';
import { useApiCall } from '../hooks';
import { getRandomId, cloudQueryApiBaseUrl } from '../utils';
import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';

interface GCPConnectorContextProps {
  createAndAuthenticateConnector: (
    params: any,
  ) => Promise<{ connectorId?: string; _serviceAccount?: string }>;
  finishConnectorAuthentication: (params: any) => Promise<boolean>;
  authenticationError: Error | null;
  authenticationLoading: boolean;
}

const GCPConnectorContext = createContext<GCPConnectorContextProps | undefined>(undefined);

/**
 * @public
 */
export type GCPConnectorContextProviderProps = {
  children: React.ReactNode;
  pluginUiMessageHandler: PluginUiMessageHandler;
};

/**
 * Provider for GCP Connector context.
 *
 * @public
 */
export const GCPConnectorContextProvider: React.FC<GCPConnectorContextProviderProps> = ({
  children,
  pluginUiMessageHandler,
}) => {
  const { callApi } = useApiCall(pluginUiMessageHandler);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createAndAuthenticateConnector = useCallback(
    async ({
      connectorId: existingConnectorId,
      teamName,
      pluginTeamName,
      pluginName,
      pluginKind,
    }: {
      connectorId?: string;
      teamName: string;
      pluginTeamName: string;
      pluginName: string;
      pluginKind: 'source' | 'destination';
    }): Promise<{
      connectorId?: string;
      _serviceAccount?: string;
    }> => {
      setIsLoading(true);
      setError(null);

      try {
        let connectorId = existingConnectorId;
        if (!connectorId) {
          const connectorName = getRandomId();
          const { requestPromise: createConnector } = await callApi<{ id: string }>(
            `${cloudQueryApiBaseUrl}/teams/${teamName}/connectors`,
            'POST',
            {
              type: 'gcp',
              name: connectorName,
            },
          );

          const {
            body: { id: newConnectorId },
          } = await createConnector;

          connectorId = newConnectorId;
        }

        const { requestPromise: authenticateConnector } = await callApi<{
          service_account: string;
        }>(
          `${cloudQueryApiBaseUrl}/teams/${teamName}/connectors/${connectorId}/authenticate/gcp`,
          'POST',
          {
            plugin_team: pluginTeamName,
            plugin_kind: pluginKind,
            plugin_name: pluginName,
          },
        );

        const {
          body: { service_account: _serviceAccount },
        } = await authenticateConnector;

        return { connectorId, _serviceAccount };
      } catch (error: any) {
        setIsLoading(false);
        setError(error?.body || error);

        return {};
      }
    },
    [callApi],
  );

  const finishConnectorAuthentication = useCallback(
    async ({
      connectorId,
      teamName,
    }: {
      connectorId: string;
      teamName: string;
    }): Promise<boolean> => {
      try {
        const { requestPromise: finishAuth } = await callApi<{ id: string }>(
          `${cloudQueryApiBaseUrl}/teams/${teamName}/connectors/${connectorId}/authenticate/gcp/finish`,
          'POST',
          {},
        );

        await finishAuth;

        return true;
      } catch (error: any) {
        setIsLoading(false);
        setError(error?.body || error);

        return false;
      }
    },
    [callApi],
  );

  return (
    <GCPConnectorContext.Provider
      value={{
        createAndAuthenticateConnector,
        finishConnectorAuthentication,
        authenticationError: error,
        authenticationLoading: isLoading,
      }}
    >
      {children}
    </GCPConnectorContext.Provider>
  );
};

/**
 * GCP Connector context.
 *
 * @public
 */
export const useGCPConnectorContext = () => {
  const context = useContext(GCPConnectorContext);
  if (!context) {
    throw new Error('useGCPConnector must be used within a GCPConnectorProvider');
  }

  return context;
};

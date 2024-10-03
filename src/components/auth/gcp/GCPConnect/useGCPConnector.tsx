import { useCallback, useState } from 'react';

import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';
import { useApiCall } from '../../../../hooks';
import { cloudQueryApiBaseUrl, getRandomId } from '../../../../utils';

interface UseGCPConnectorResponse {
  createAndAuthenticateConnector: (
    params: any,
  ) => Promise<{ connectorId?: string; _serviceAccount?: string }>;
  finishConnectorAuthentication: (params: any) => Promise<boolean>;
  authenticationError: Error | null;
  authenticationLoading: boolean;
}

export type GCPConnectorProps = {
  pluginUiMessageHandler: PluginUiMessageHandler;
};

export const useGCPConnector = ({
  pluginUiMessageHandler,
}: GCPConnectorProps): UseGCPConnectorResponse => {
  const { callApi } = useApiCall(pluginUiMessageHandler);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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

        if (!existingConnectorId) {
          await finishConnectorAuthentication({
            connectorId,
            teamName,
          });
        }

        return { connectorId, _serviceAccount };
      } catch (error: any) {
        setIsLoading(false);
        setError(error?.body || error);

        return {};
      }
    },
    [callApi, finishConnectorAuthentication],
  );

  return {
    createAndAuthenticateConnector,
    finishConnectorAuthentication,
    authenticationError: error,
    authenticationLoading: isLoading,
  };
};

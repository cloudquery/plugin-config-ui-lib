import { useCallback, useState } from 'react';

import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';

import { useApiCall } from '../../../hooks';
import { cloudQueryApiBaseUrl, getRandomId } from '../../../utils';

interface UseAuthConnectorResponse {
  createAndAuthenticateConnector: <T>(params: any) => Promise<T & { connectorId?: string }>;
  finishConnectorAuthentication: (params: any) => Promise<boolean>;
  authenticationError: Error | null;
  authenticationLoading: boolean;
}

/**
 * @public
 */
export type UseAuthConnectorProps = {
  kind: 'gcp' | 'aws';
  pluginUiMessageHandler: PluginUiMessageHandler;
};

/**
 * @public
 * Handles the authentication handshake for certain auth handlers, currently: 'aws' & 'gcp'
 */
export const useAuthConnector = ({
  kind,
  pluginUiMessageHandler,
}: UseAuthConnectorProps): UseAuthConnectorResponse => {
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
          `${cloudQueryApiBaseUrl}/teams/${teamName}/connectors/${connectorId}/authenticate/${kind}/finish`,
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
    [callApi, kind],
  );

  const createAndAuthenticateConnector = useCallback(
    async function <T>({
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
    }): Promise<T & { connectorId?: string }> {
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
              type: kind,
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
          `${cloudQueryApiBaseUrl}/teams/${teamName}/connectors/${connectorId}/authenticate/${kind}`,
          'POST',
          {
            plugin_team: pluginTeamName,
            plugin_kind: pluginKind,
            plugin_name: pluginName,
          },
        );

        const { body } = await authenticateConnector;

        if (!existingConnectorId) {
          await finishConnectorAuthentication({
            connectorId,
            teamName,
          });
        }

        return { connectorId, ...(body as T) };
      } catch (error: any) {
        setIsLoading(false);
        setError(error?.body || error);

        return {} as { connectorId?: string } & T;
      }
    },
    [callApi, finishConnectorAuthentication, kind],
  );

  return {
    createAndAuthenticateConnector,
    finishConnectorAuthentication,
    authenticationError: error,
    authenticationLoading: isLoading,
  };
};

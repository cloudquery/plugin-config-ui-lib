import { useCallback, useState } from 'react';

import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';

import { useApiCall } from '../../../hooks';
import { cloudQueryApiBaseUrl, getRandomId } from '../../../utils';
import { finishAuthConnectorAuthentication } from '../../../utils/finishAuthConnectorAuthentication';

interface UseAuthConnectorResponse {
  createAndAuthenticateConnector: <T>(params: any) => Promise<T & { connectorId?: string }>;
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

  const createAndAuthenticateConnector = useCallback(
    async function <T>({
      connectorId: existingConnectorId,
      teamName,
      pluginTeamName,
      pluginName,
      pluginKind,
      finishImmediately = true,
    }: {
      connectorId?: string;
      teamName: string;
      pluginTeamName: string;
      pluginName: string;
      pluginKind: 'source' | 'destination';
      finishImmediately?: boolean;
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

        if (!existingConnectorId && finishImmediately) {
          await finishAuthConnectorAuthentication({
            connectorId,
            teamName,
            path: `/${kind}/finish`,
            callApi,
          });
        }

        setIsLoading(false);

        return { connectorId, ...(body as T) };
      } catch (error: any) {
        setIsLoading(false);
        setError(error?.body || error);

        return {} as { connectorId?: string } & T;
      }
    },
    [callApi, kind],
  );

  return {
    createAndAuthenticateConnector,
    authenticationError: error,
    authenticationLoading: isLoading,
  };
};

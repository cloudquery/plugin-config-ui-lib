import { useCallback, useEffect, useState } from 'react';

import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';

import { useApiCall } from './useApiCall';
import { getRandomId } from '../utils/getRandomId';

/**
 * This hook is used to create an OAuth connector and authenticate it.
 *
 * @param pluginUiMessageHandler - Plugin UI message handler
 * @param teamName - Team name
 * @param pluginTeamName - Plugin team name
 * @param pluginName - Plugin name
 * @param pluginKind - Plugin kind
 * @param apiBaseUrl - CloudQuery API base URL
 * @param successBaseUrl - Base URL that will be used to redirect the user upon successful authentication
 *
 * @public
 */
export function useOauthConnector({
  pluginUiMessageHandler,
  teamName,
  pluginKind,
  pluginName,
  pluginTeamName,
  apiBaseUrl,
  successBaseUrl,
}: {
  pluginUiMessageHandler: PluginUiMessageHandler;
  teamName: string;
  pluginTeamName: string;
  pluginName: string;
  pluginKind: 'source' | 'destination';
  apiBaseUrl: string;
  successBaseUrl: string;
}) {
  const { callApi } = useApiCall(pluginUiMessageHandler);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [connectorId, setConnectorId] = useState<string | null>(null);
  const [authConnectorResult, setAuthConnectorResult] = useState<Record<string, string> | null>(
    null,
  );

  /**
   * Creates an OAuth connector and authenticates it.
   *
   * @returns Connector ID, connector name, and redirect URL to which the user should be redirected to.
   */
  const createAndAuthenticateConnector = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setAuthConnectorResult(null);

    try {
      const connectorName = getRandomId();
      const { requestPromise: createConnector } = await callApi<{ id: string }>(
        `${apiBaseUrl}/teams/${teamName}/connectors`,
        'POST',
        {
          type: 'oauth',
          name: connectorName,
        },
      );

      const {
        body: { id: connectorId },
      } = await createConnector;

      const { requestPromise: authenticateConnector } = await callApi<{ redirect_url: string }>(
        `${apiBaseUrl}/teams/${teamName}/connectors/${connectorId}/authenticate/oauth`,
        'POST',
        {
          plugin_team: pluginTeamName,
          plugin_kind: pluginKind,
          plugin_name: pluginName,
          base_url: successBaseUrl,
        },
      );

      const {
        body: { redirect_url: redirectUrl },
      } = await authenticateConnector;

      setConnectorId(connectorId);

      pluginUiMessageHandler.sendMessage('open_url', {
        url: redirectUrl,
      });
    } catch (error: any) {
      setIsLoading(false);
      setError(error?.body || error);
    }
  }, [
    apiBaseUrl,
    callApi,
    pluginKind,
    pluginName,
    pluginTeamName,
    pluginUiMessageHandler,
    successBaseUrl,
    teamName,
  ]);

  /**
   * Finish connector authentication
   *
   * @param connectorId - connector id
   */
  const finishConnectorAuthentication = useCallback(
    async (connectorId: string, connectorResult: Record<string, string>) => {
      try {
        const searchParams = new URLSearchParams(connectorResult);
        const { requestPromise: finishOauth } = await callApi<{ id: string }>(
          `${apiBaseUrl}/teams/${teamName}/connectors/${connectorId}/authenticate/oauth`,
          'PATCH',
          {
            return_url: `${successBaseUrl}?${searchParams.toString()}`,
            base_url: successBaseUrl,
          },
        );

        await finishOauth;
      } catch (error: any) {
        setIsLoading(false);
        setError(error?.body || error);
      }
    },
    [apiBaseUrl, callApi, successBaseUrl, teamName],
  );

  useEffect(() => {
    if (isLoading && connectorId) {
      return pluginUiMessageHandler.subscribeToMessage('auth_connector_result', async (payload) => {
        try {
          await finishConnectorAuthentication(connectorId, payload);
          setAuthConnectorResult(payload);
        } catch (error: any) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      });
    }
  }, [connectorId, finishConnectorAuthentication, isLoading, pluginUiMessageHandler]);

  return {
    authenticate: createAndAuthenticateConnector,
    isLoading,
    connectorId,
    authConnectorResult,
    error,
  };
}

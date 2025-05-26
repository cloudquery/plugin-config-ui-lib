import { useCallback, useEffect, useRef, useState } from 'react';

import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';

import customFetch from '../utils/customFetch';
import { getRandomId } from '../utils/getRandomId';

interface UseOauthConnectorProps {
  pluginUiMessageHandler: PluginUiMessageHandler;
  teamName: string;
  pluginTeamName: string;
  pluginName: string;
  pluginKind: 'source' | 'destination';
  successBaseUrl: string;
  getConnectPayloadSpec?: () => Promise<Record<string, any> | undefined>;
  getFinishPayloadSpec?: () => Promise<Record<string, any> | undefined>;
}

/**
 * This hook is used to create an OAuth connector and authenticate it.
 *
 * @param pluginUiMessageHandler - Plugin UI message handler
 * @param teamName - Team name
 * @param pluginTeamName - Plugin team name
 * @param pluginName - Plugin name
 * @param pluginKind - Plugin kind
 * @param successBaseUrl - Base URL that will be used to redirect the user upon successful authentication
 * @param getConnectPayloadSpec - An async callback which returns a spec object added to the authenticate/oauth POST request payload
 * @param getFinishPayloadSpec - An async callback which returns a spec object added to the authenticate/oauth PATCH request payload
 *
 * @public
 */
export function useOauthConnector({
  pluginUiMessageHandler,
  teamName,
  pluginKind,
  pluginName,
  pluginTeamName,
  successBaseUrl,
  getConnectPayloadSpec,
  getFinishPayloadSpec,
}: UseOauthConnectorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [connectorId, setConnectorId] = useState<string | null>(null);
  const [authConnectorResult, setAuthConnectorResult] = useState<Record<string, string> | null>(
    null,
  );
  const authConnectorResultSubscriptionRef = useRef<() => void>();

  const cancel = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setAuthConnectorResult(null);
    setConnectorId(null);
    authConnectorResultSubscriptionRef.current?.();
  }, []);

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
      const { data: createConnector } = await customFetch<{ id: string }>({
        method: 'POST',
        url: `/teams/${teamName}/connectors`,
        data: {
          type: 'oauth',
          name: connectorName,
        },
      });

      const { id: connectorId } = createConnector;

      const { data: authenticateConnector } = await customFetch<{ redirect_url: string }>({
        method: 'POST',
        url: `/teams/${teamName}/connectors/${connectorId}/authenticate/oauth`,
        data: {
          plugin_team: pluginTeamName,
          plugin_kind: pluginKind,
          plugin_name: pluginName,
          base_url: successBaseUrl,
          spec: await getConnectPayloadSpec?.(),
        },
      });

      const { redirect_url: redirectUrl } = authenticateConnector;

      setConnectorId(connectorId);

      window.top?.open(redirectUrl, '_blank');
    } catch (error: any) {
      setIsLoading(false);
      setConnectorId(null);
      setAuthConnectorResult(null);
      setError(error?.body || error);
    }
  }, [pluginKind, pluginName, pluginTeamName, successBaseUrl, teamName, getConnectPayloadSpec]);

  /**
   * Finish connector authentication
   *
   * @param connectorId - connector id
   */
  const finishConnectorAuthentication = useCallback(
    async (connectorId: string, connectorResult: Record<string, string>) => {
      try {
        const searchParams = new URLSearchParams(connectorResult);
        await customFetch<{ id: string }>({
          method: 'PATCH',
          url: `/teams/${teamName}/connectors/${connectorId}/authenticate/oauth`,
          data: {
            return_url: `${successBaseUrl}?${searchParams.toString()}`,
            base_url: successBaseUrl,
            spec: await getFinishPayloadSpec?.(),
          },
        });
      } catch (error: any) {
        setIsLoading(false);
        setError(error?.body || error);
      }
    },
    [successBaseUrl, teamName, getFinishPayloadSpec],
  );

  useEffect(() => {
    if (isLoading && connectorId) {
      const unsubscribe = pluginUiMessageHandler.subscribeToMessageOnce(
        'auth_connector_result',
        async (payload) => {
          try {
            await finishConnectorAuthentication(connectorId, payload);
            setAuthConnectorResult(payload);
          } catch (error: any) {
            setError(error);
          } finally {
            setIsLoading(false);
          }
        },
      );

      authConnectorResultSubscriptionRef.current = unsubscribe;

      return unsubscribe;
    }
  }, [connectorId, finishConnectorAuthentication, isLoading, pluginUiMessageHandler]);

  return {
    authenticate: createAndAuthenticateConnector,
    isLoading,
    connectorId,
    authConnectorResult,
    error,
    cancel,
  };
}

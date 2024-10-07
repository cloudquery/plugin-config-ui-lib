import { useApiCall } from '../hooks';
import { cloudQueryApiBaseUrl } from './constants';
import { getRandomId } from './getRandomId';

type AuthPluginType = 'aws' | 'gcp';

export async function getAuthenticateConnector({
  connectorId,
  teamName,
  callApi,
  authPluginType,
}: {
  connectorId: string;
  teamName: string;
  callApi: ReturnType<typeof useApiCall>['callApi'];
  authPluginType: AuthPluginType;
}) {
  const { requestPromise } = callApi<{
    role_arn: string;
    external_id: string;
  }>(
    `${cloudQueryApiBaseUrl}/teams/${teamName}/connectors/${connectorId}/authenticate/${authPluginType}`,
    'GET',
  );

  return requestPromise;
}

/**
 * Conditionally creates a connectorId, then begins the authentication process for the new or existing connectorId
 *
 * @public
 */
export async function createAndAuthenticateConnector<T>({
  connectorId: existingConnectorId,
  teamName,
  pluginTeamName,
  authPluginType,
  pluginName,
  pluginKind,
  callApi,
  authenticatePayload,
}: {
  connectorId?: string;
  teamName: string;
  pluginTeamName: string;
  authPluginType: AuthPluginType;
  pluginName: string;
  pluginKind: 'source' | 'destination';
  finishImmediately?: boolean;
  callApi: ReturnType<typeof useApiCall>['callApi'];
  authenticatePayload?: Partial<{
    plugin_version: string;
    spec: Record<string, any>;
    env: Record<string, any>[];
    tables: string[];
    skip_tables: string[];
    skip_dependent_tables: boolean;
  }>;
}): Promise<T & { connectorId?: string }> {
  let connectorId = existingConnectorId;
  if (!connectorId) {
    const connectorName = getRandomId();
    const { requestPromise: createConnector } = await callApi<{ id: string }>(
      `${cloudQueryApiBaseUrl}/teams/${teamName}/connectors`,
      'POST',
      {
        type: authPluginType,
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
    `${cloudQueryApiBaseUrl}/teams/${teamName}/connectors/${connectorId}/authenticate/${authPluginType}`,
    'POST',
    {
      plugin_team: pluginTeamName,
      plugin_kind: pluginKind,
      plugin_name: pluginName,
      ...authenticatePayload,
    },
  );

  const { body } = await authenticateConnector;

  return { connectorId, ...(body as T) };
}

/**
 * Finishes authentication to a connectorId
 *
 * @public
 */
export async function finishAuthConnectorAuthentication({
  authPluginType,
  connectorId,
  teamName,
  callApi,
  method,
  payload,
  path = '',
}: {
  connectorId: string;
  teamName: string;
  authPluginType: AuthPluginType;
  callApi: ReturnType<typeof useApiCall>['callApi'];
  method: 'POST' | 'PATCH';
  payload: Record<string, any>;
  path?: string;
}) {
  const { requestPromise: finishAuth } = await callApi<{ id: string }>(
    `${cloudQueryApiBaseUrl}/teams/${teamName}/connectors/${connectorId}/authenticate/${authPluginType}${path}`,
    method,
    payload,
  );

  await finishAuth;
}

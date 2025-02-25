import customFetch from './customFetch';
import { getRandomId } from './getRandomId';

type AuthPluginType = 'aws' | 'gcp';

/**
 * Gets the authenticate connector for a given connectorId
 * @public
 */
export async function getAuthenticateConnector({
  connectorId,
  teamName,
  authPluginType,
}: {
  connectorId: string;
  teamName: string;
  authPluginType: AuthPluginType;
}) {
  const { data: authenticateConnector } = await customFetch<{
    role_arn: string;
    external_id: string;
  }>({
    method: 'GET',
    url: `/teams/${teamName}/connectors/${connectorId}/authenticate/${authPluginType}`,
  });

  return authenticateConnector;
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
  authenticatePayload,
}: {
  connectorId?: string;
  teamName: string;
  pluginTeamName: string;
  authPluginType: AuthPluginType;
  pluginName: string;
  pluginKind: 'source' | 'destination';
  finishImmediately?: boolean;
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
    const { data: connector } = await customFetch<{ id: string }>({
      method: 'POST',
      url: `/teams/${teamName}/connectors`,
      data: {
        type: authPluginType,
        name: connectorName,
      },
    });

    connectorId = connector.id;
  }

  const { data: authenticateConnector } = await customFetch<{
    service_account: string;
  }>({
    method: 'POST',
    url: `/teams/${teamName}/connectors/${connectorId}/authenticate/${authPluginType}`,
    data: {
      plugin_team: pluginTeamName,
      plugin_kind: pluginKind,
      plugin_name: pluginName,
      ...authenticatePayload,
    },
  });

  return { connectorId, ...(authenticateConnector as T) };
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
  method,
  payload,
  path = '',
}: {
  connectorId: string;
  teamName: string;
  authPluginType: AuthPluginType;
  method: 'POST' | 'PATCH';
  payload: Record<string, any>;
  path?: string;
}) {
  await customFetch<{ id: string }>({
    method,
    url: `/teams/${teamName}/connectors/${connectorId}/authenticate/${authPluginType}${path}`,
    data: payload,
  });
}

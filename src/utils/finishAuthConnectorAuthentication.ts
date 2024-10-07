import { useApiCall } from '../hooks';
import { cloudQueryApiBaseUrl } from './constants';

export async function finishAuthConnectorAuthentication({
  connectorId,
  teamName,
  kind,
  callApi,
  method = 'POST',
  payload = {},
  path = '/finish',
}: {
  connectorId: string;
  teamName: string;
  kind: string;
  callApi: ReturnType<typeof useApiCall>['callApi'];
  method?: 'POST' | 'PATCH';
  payload?: Record<string, any>;
  path?: string;
}) {
  try {
    const { requestPromise: finishAuth } = await callApi<{ id: string }>(
      `${cloudQueryApiBaseUrl}/teams/${teamName}/connectors/${connectorId}/authenticate/${kind}${path}`,
      method,
      payload,
    );

    await finishAuth;

    return true;
  } catch (error: any) {
    return error?.body?.message || error?.message;
  }
}

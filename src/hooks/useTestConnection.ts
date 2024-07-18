import { useCallback, useEffect, useRef } from 'react';

import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';

import { useApiCall } from './useApiCall';
import { cloudQueryApiBaseUrl } from '../utils/constants';
import { generateApiAbortError } from '../utils/errors';

/**
 * Custom hook to handle testing of connections with the ability to cancel the test.
 *
 * @public
 */
export function useTestConnection(pluginUiMessageHandler: PluginUiMessageHandler) {
  const { callApi } = useApiCall(pluginUiMessageHandler);
  const abortRef = useRef<{ abort: () => void; shouldAbort: boolean }>();

  const testConnection = useCallback(
    async (
      values: {
        name: string;
        path: string;
        version: string;
        spec: Record<string, any>;
        env: Array<{ name: string; value?: string }>;
        connector_id?: string;
      },
      teamName: string,
      pluginKind: 'source' | 'destination',
      isUpdating: boolean,
    ): Promise<string> => {
      try {
        const { requestPromise, abortRequest } = callApi<{ id: string }>(
          `${cloudQueryApiBaseUrl}/teams/${teamName}/sync-${pluginKind}-test-connections`,
          'POST',
          {
            env: values.env,
            path: values.path,
            spec: values.spec,
            version: values.version,
            name: isUpdating ? values.name : undefined,
            connector_id: values.connector_id,
          },
        );

        abortRef.current = {
          abort: abortRequest,
          shouldAbort: false,
        };

        const {
          body: { id: connectionId },
        } = await requestPromise;

        abortRef.current.abort = () => undefined;

        if (abortRef.current?.shouldAbort) {
          throw generateApiAbortError();
        }

        return monitorSyncTestConnection({
          abortObj: abortRef.current,
          callApi,
          teamName,
          testConnectionId: connectionId,
          pluginKind,
        });
      } catch (error: any) {
        if (error.name === 'AbortError') {
          throw generateApiAbortError();
        }

        throw error;
      }
    },
    [callApi],
  );

  const cancelTestConnection = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current.shouldAbort = true;
    }
  }, []);

  useEffect(() => {
    return cancelTestConnection;
  }, [cancelTestConnection]);

  return {
    cancelTestConnection,
    testConnection,
  };
}

async function monitorSyncTestConnection({
  abortObj,
  callApi,
  teamName,
  testConnectionId,
  pluginKind,
}: {
  teamName: string;
  testConnectionId: string;
  abortObj: { abort: () => void; shouldAbort: boolean };
  callApi: ReturnType<typeof useApiCall>['callApi'];
  pluginKind: 'source' | 'destination';
}): Promise<string> {
  const iterations = 30;
  for (let i = 0; i < iterations; i++) {
    if (abortObj.shouldAbort) {
      throw generateApiAbortError();
    }
    const { requestPromise, abortRequest } = callApi<{ status: string; failure_reason: string }>(
      `${cloudQueryApiBaseUrl}/teams/${teamName}/sync-${pluginKind}-test-connections/${testConnectionId}`,
      'GET',
    );
    abortObj.abort = abortRequest;

    const { body } = await requestPromise;
    abortObj.abort = () => undefined;

    if (body.status === 'failed') {
      throw new Error(body.failure_reason || 'Unknown error');
    }

    if (body.status === 'completed' && body.failure_reason?.trim()) {
      throw new Error(body.failure_reason.trim());
    }

    if (body.status === 'completed') {
      return testConnectionId;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error('Connection timed out');
}

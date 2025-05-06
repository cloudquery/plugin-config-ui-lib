import { useCallback, useEffect, useRef, useState } from 'react';

import customFetch from '../utils/customFetch';
import { generateApiAbortError } from '../utils/errors';

/**
 * Custom hook to handle testing of connections with the ability to cancel the test.
 *
 * @public
 */
export function useTestConnection() {
  const [testConnectionId, setTestConnectionId] = useState<string>();
  const abortRef = useRef<{ abortController: AbortController; shouldAbort: boolean }>();

  const testConnection = useCallback(
    async (
      values: {
        name: string;
        path: string;
        version: string;
        spec: Record<string, any>;
        env: Array<{ name: string; value?: string }>;
        connector_id?: string;
        onboarding_id?: string;
      },
      teamName: string,
      pluginKind: 'source' | 'destination',
      isUpdating: boolean,
    ): Promise<string> => {
      abortRef.current = {
        abortController: new AbortController(),
        shouldAbort: false,
      };
      setTestConnectionId(undefined);

      try {
        const nameKey = pluginKind === 'source' ? 'source_name' : 'destination_name';
        const {
          data: { id },
        } = await customFetch<{ id: string }>({
          method: 'POST',
          url: `/teams/${teamName}/sync-${pluginKind}-test-connections`,
          data: {
            env: values.env,
            path: values.path,
            spec: values.spec,
            version: values.version,
            [nameKey]: isUpdating ? values.name : undefined,
            connector_id: values.connector_id,
            onboarding_id: values.onboarding_id,
          },
        });

        if (abortRef.current?.shouldAbort) {
          throw generateApiAbortError();
        }

        setTestConnectionId(id);

        return monitorSyncTestConnection({
          abortObj: abortRef.current,
          teamName,
          testConnectionId: id,
          pluginKind,
        });
      } catch (error: any) {
        if (error.name === 'AbortError') {
          throw generateApiAbortError();
        }

        throw error;
      }
    },
    [],
  );

  const cancelTestConnection = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abortController.abort();
      abortRef.current.shouldAbort = true;
    }
  }, []);

  useEffect(() => {
    return cancelTestConnection;
  }, [cancelTestConnection]);

  return {
    cancelTestConnection,
    testConnection,
    testConnectionId,
  };
}

async function monitorSyncTestConnection({
  abortObj,
  teamName,
  testConnectionId,
  pluginKind,
}: {
  teamName: string;
  testConnectionId: string;
  abortObj: { abortController: AbortController; shouldAbort: boolean };
  pluginKind: 'source' | 'destination';
}): Promise<string> {
  const iterations = 30;
  for (let i = 0; i < iterations; i++) {
    if (abortObj.shouldAbort) {
      throw generateApiAbortError();
    }
    const { data: testConnection } = await customFetch<{
      status: string;
      failure_reason: string;
      failure_code: string;
    }>({
      method: 'GET',
      url: `/teams/${teamName}/sync-${pluginKind}-test-connections/${testConnectionId}`,
    });

    if (testConnection.status === 'failed') {
      const error: Error & { code?: string } = new Error(
        testConnection.failure_reason || 'Unknown error',
      );
      error.code = testConnection.failure_code;
      throw error;
    }

    if (testConnection.status === 'completed' && testConnection.failure_reason?.trim()) {
      const error: Error & { code?: string } = new Error(testConnection.failure_reason.trim());
      error.code = testConnection.failure_code;
      throw error;
    }

    if (testConnection.status === 'completed') {
      return testConnectionId;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error('Connection timed out');
}

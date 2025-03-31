import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';

import { useTheme } from '@mui/material/styles';

import { SyncLogLevel } from '../types';
import customFetch from '../utils/customFetch';
import { parseSyncLogsByLevel } from '../utils/logs';

export function useGetTestConnectionLogs(
  endpoint: string,
  { query: { enabled } }: { query: { enabled: boolean } },
) {
  const { palette } = useTheme();
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<any | null>(null);
  const [data, setData] = useState<
    { logLevel: SyncLogLevel; logLine: ReactNode; logText: string }[]
  >([]);
  const abortController = useRef<AbortController | null>(null);

  const loadData = useCallback(async () => {
    abortController.current?.abort();
    abortController.current = new AbortController();
    try {
      setData([]);
      setError(null);
      setIsLoading(true);
      const { response } = await customFetch<any>({
        method: 'GET',
        signal: abortController.current.signal,
        streamData: true,
        url: endpoint,
      });

      if (abortController.current.signal.aborted) {
        return;
      }

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      if (response.headers.get('content-type') === 'text/plain') {
        if (!response.body) {
          throw new Error('No response body');
        }
        let logs: { logLevel: SyncLogLevel; logLine: ReactNode; logText: string }[] = [];
        const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
        try {
          // eslint-disable-next-line no-constant-condition
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            const parsedValue = parseSyncLogsByLevel(value, palette);
            logs = [...logs, ...parsedValue];
            if (abortController.current.signal.aborted) {
              return;
            }
            setData(logs);
            setIsLoading(false);
          }
        } finally {
          reader.releaseLock();
        }

        return;
      }

      if (response.headers.get('content-type') === 'application/json') {
        const data = (await response.json()) as { location: string };
        const logDataResponse = await fetch(
          data.location.startsWith('http')
            ? data.location
            : `${window.location.origin}${data.location}`,
        );
        if (!logDataResponse.ok) {
          throw new Error(logDataResponse.statusText);
        }
        const text = await logDataResponse.text();
        if (abortController.current.signal.aborted) {
          return;
        }
        setData(parseSyncLogsByLevel(text, palette));

        return;
      }

      throw new Error('Unsupported content type');
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, palette]);

  useEffect(() => {
    if (enabled) {
      loadData();
    }

    return () => {
      abortController.current?.abort();
      setIsLoading(false);
      setError(null);
    };
  }, [enabled, loadData]);

  return {
    data,
    error,
    isLoading,
    refetch: loadData,
  };
}

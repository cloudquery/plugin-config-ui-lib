import { useCallback, useEffect, useRef } from 'react';

import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';

/**
 * This hook is used to make API calls that require Authentication header from CloudQuery Cloud App.
 * It sends an `api_call_request` message to the CloudQuery Cloud App with the endpoint, method, body, and options.
 * It subscribes to the `api_call_response` message to get the response from the CloudQuery Cloud App.
 *
 * @public
 */
export function useApiCall<ResponseData>(pluginUiMessageHandler: PluginUiMessageHandler) {
  const unsubscribeList = useRef<(() => void)[]>([]);

  const callApi = useCallback(
    (
      endpoint: string,
      method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
      body: any,
      options: {
        headers?: HeadersInit;
        mode?: RequestMode;
      },
    ) => {
      let unsubscribeFromResponse: (() => void) | null = null;
      let rejectPromise: (reason: any) => void;
      const requestId = Math.random().toString(36).slice(7);

      const requestPromise = new Promise<{
        body: ResponseData;
        endpoint: string;
        headers: HeadersInit;
        status: number;
      }>((resolve, reject) => {
        rejectPromise = reject;

        pluginUiMessageHandler.sendMessage('api_call_request', {
          endpoint,
          method,
          id: requestId,
          body,
          options,
        });

        unsubscribeFromResponse = pluginUiMessageHandler.subscribeToMessage(
          'api_call_response',
          ({ endpoint, headers, id, ok, status, body }) => {
            if (id === requestId) {
              unsubscribeFromResponse();
              unsubscribeList.current = unsubscribeList.current.filter(
                (unsubscribe) => unsubscribe !== unsubscribeFromResponse,
              );

              if (ok) {
                resolve({ body, endpoint, headers, status });
              } else {
                reject({ body, endpoint, headers, status });
              }
            }
          },
        );

        unsubscribeList.current.push(unsubscribeFromResponse);
      });

      const abortRequest = () => {
        unsubscribeFromResponse();
        unsubscribeList.current = unsubscribeList.current.filter(
          (unsubscribe) => unsubscribe !== unsubscribeFromResponse,
        );
        pluginUiMessageHandler.sendMessage('api_call_abort_request', {
          id: requestId,
        });
        rejectPromise({ body: null, endpoint, headers: null, status: 0 });
      };

      return { requestPromise, abortRequest, requestId };
    },
    [pluginUiMessageHandler],
  );

  useEffect(() => {
    return () => {
      for (const unsubscribe of unsubscribeList.current) {
        if (unsubscribe) {
          unsubscribe();
        }
      }
    };
  }, []);

  return { callApi };
}

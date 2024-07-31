import { useCallback, useEffect, useRef } from 'react';

import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';

import { getRandomId } from '../utils/getRandomId';

/**
 * This hook is used to make API calls that require Authentication header from CloudQuery Cloud App.
 * It sends an `api_call_request` message to the CloudQuery Cloud App with the endpoint, method, body, and options.
 * It subscribes to the `api_call_response` message to get the response from the CloudQuery Cloud App.
 * It also sends an `api_call_abort_request` message to the CloudQuery Cloud App to abort the request.
 *
 * @public
 */
export function useApiCall(pluginUiMessageHandler: PluginUiMessageHandler) {
  const unsubscribeList = useRef<(() => void)[]>([]);

  const callApi = useCallback(
    <ResponseData>(
      endpoint: string,
      method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
      body?: any,
      options?: {
        headers?: Record<string, string>;
        mode?: 'cors' | 'navigate' | 'no-cors' | 'same-origin';
      },
    ) => {
      let unsubscribeFromResponse: (() => void) | null = null;
      const requestId = getRandomId();

      const requestPromise = new Promise<{
        body: ResponseData;
        endpoint: string;
        headers: Record<string, string>;
        status: number;
      }>((resolve, reject) => {
        pluginUiMessageHandler.sendMessage('api_call_request', {
          endpoint,
          method,
          id: requestId,
          body,
          options,
        });

        unsubscribeFromResponse = pluginUiMessageHandler.subscribeToMessage(
          'api_call_response',
          (response) => {
            if (response.id === requestId) {
              unsubscribeFromResponse?.();
              unsubscribeList.current = unsubscribeList.current.filter(
                (unsubscribe) => unsubscribe !== unsubscribeFromResponse,
              );

              if (response.ok) {
                resolve({
                  body: response.body,
                  endpoint: response.endpoint,
                  headers: response.headers,
                  status: response.status,
                });
              } else {
                reject({
                  body: response.body,
                  endpoint: response.endpoint,
                  headers: response.headers,
                  status: response.status,
                });
              }
            }
          },
        );

        unsubscribeList.current.push(unsubscribeFromResponse);
      });

      const abortRequest = () => {
        pluginUiMessageHandler.sendMessage('api_call_abort_request', {
          id: requestId,
        });
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

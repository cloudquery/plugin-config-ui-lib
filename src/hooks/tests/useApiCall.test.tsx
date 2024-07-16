import {
  FormMessagePayload,
  FormMessageType,
  formMessageTypes,
  getPluginUiMessageHandler,
  MessageHandler,
  PluginUiMessagePayload,
  PluginUiMessageType,
  pluginUiMessageTypes,
} from '@cloudquery/plugin-config-ui-connector';
import { renderHook, act } from '@testing-library/react';

import { useApiCall } from '../useApiCall';

describe('useApiCall', () => {
  const pluginUiMessageHandler = getPluginUiMessageHandler();

  const formMessageHandler = new MessageHandler<
    FormMessageType,
    FormMessagePayload,
    PluginUiMessageType,
    PluginUiMessagePayload
  >(formMessageTypes, pluginUiMessageTypes, window.parent);

  test('should send api_call_request message on callApi', async () => {
    const pluginUiMessageHandlerMock: any = {
      sendMessage: jest.fn(),
      subscribeToMessage: jest.fn(),
    };
    const { result } = renderHook(() => useApiCall(pluginUiMessageHandlerMock));
    const { callApi } = result.current;

    const endpoint = '/test-endpoint';
    const method = 'GET';
    const body = null;
    const options = { headers: { 'Content-Type': 'application/json' } };

    await act(async () => {
      callApi(endpoint, method, body, options);
    });

    expect(pluginUiMessageHandlerMock.sendMessage).toHaveBeenCalledWith('api_call_request', {
      endpoint,
      method,
      id: expect.any(String),
      body,
      options,
    });
  });

  test('should resolve requestPromise on successful response', async () => {
    const { result } = renderHook(() => useApiCall(pluginUiMessageHandler));
    const { callApi } = result.current;

    const endpoint = '/test-endpoint';
    const method = 'GET';
    const body = null;
    const options = { headers: { 'Content-Type': 'application/json' } };
    const responseData = { data: 'test' };

    let requestId;

    await act(async () => {
      const { requestPromise, requestId: id } = callApi(endpoint, method, body, options);
      requestId = id;

      const headers = {
        'Content-Type': 'application/json',
      };
      formMessageHandler.sendMessage('api_call_response', {
        endpoint,
        headers,
        id: requestId,
        ok: true,
        status: 200,
        body: responseData,
      });
      const response = await requestPromise;

      expect(response).toEqual({
        body: responseData,
        endpoint,
        headers,
        status: 200,
      });
    });
  });

  test('should reject requestPromise on failed response', async () => {
    const { result } = renderHook(() => useApiCall(pluginUiMessageHandler));
    const { callApi } = result.current;

    const endpoint = '/test-endpoint';
    const method = 'GET';
    const body = null;
    const options = { headers: { 'Content-Type': 'application/json' } };
    const responseData = { error: 'not found' };

    await act(async () => {
      const { requestPromise, requestId } = callApi(endpoint, method, body, options);

      const headers = {
        'Content-Type': 'application/json',
      };
      formMessageHandler.sendMessage('api_call_response', {
        endpoint,
        headers,
        id: requestId,
        ok: false,
        status: 404,
        body: responseData,
      });
      await expect(requestPromise).rejects.toEqual({
        body: responseData,
        endpoint,
        headers,
        status: 404,
      });
    });
  });

  test('should abort the request', async () => {
    const { result } = renderHook(() => useApiCall(pluginUiMessageHandler));
    const { callApi } = result.current;

    const endpoint = '/test-endpoint';
    const method = 'GET';
    const body = null;
    const options = { headers: { 'Content-Type': 'application/json' } };

    await act(async () => {
      formMessageHandler.subscribeToMessage('api_call_request', () => {
        formMessageHandler.subscribeToMessage('api_call_abort_request', () => {
          formMessageHandler.sendMessage('api_call_response', {
            endpoint,
            headers: {},
            id: requestId,
            ok: false,
            status: 0,
            body: abortError,
          });
        });
      });
      const { requestPromise, abortRequest, requestId } = callApi(endpoint, method, body, options);

      const abortError = new Error('Request aborted');
      abortError.name = 'AbortError';

      abortRequest();
      await expect(requestPromise).rejects.toEqual({
        body: abortError,
        endpoint,
        headers: {},
        status: 0,
      });
    });
  });

  test('should clean up subscriptions on unmount', () => {
    const { result, unmount } = renderHook(() => useApiCall(pluginUiMessageHandler));
    const { callApi } = result.current;

    const endpoint = '/test-endpoint';
    const method = 'GET';
    const body = null;
    const options = { headers: { 'Content-Type': 'application/json' } };

    act(() => {
      const { requestPromise } = callApi(endpoint, method, body, options);
      unmount();

      expect(requestPromise).rejects.toEqual({
        body: null,
        endpoint,
        headers: null,
        status: 0,
      });
    });
  });
});

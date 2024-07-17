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

import { cloudQueryApiBaseUrl } from '../../utils/constants';
import { useTestConnection } from '../useTestConnection';

function getFormMessageHandler() {
  return new MessageHandler<
    FormMessageType,
    FormMessagePayload,
    PluginUiMessageType,
    PluginUiMessagePayload
  >(formMessageTypes, pluginUiMessageTypes, window.parent);
}

describe('useTestConnection', () => {
  let formMessageHandler = getFormMessageHandler();

  beforeEach(() => {
    formMessageHandler = getFormMessageHandler();
  });
  const pluginUiMessageHandler = getPluginUiMessageHandler();

  test('should test the connection successfully', async () => {
    const { result } = renderHook(() => useTestConnection(pluginUiMessageHandler));

    const { testConnection } = result.current;

    const unsubscribe = formMessageHandler.subscribeToMessage('api_call_request', (payload) => {
      if (
        payload.endpoint === `${cloudQueryApiBaseUrl}/teams/test-team/sync-source-test-connections`
      ) {
        formMessageHandler.sendMessage('api_call_response', {
          id: payload.id,
          body: { id: 'some-connection-id' },
          ok: true,
          endpoint: payload.endpoint,
          headers: {},
          status: 201,
        });
      } else if (
        payload.endpoint ===
        `${cloudQueryApiBaseUrl}/teams/test-team/sync-source-test-connections/some-connection-id`
      ) {
        formMessageHandler.sendMessage('api_call_response', {
          id: payload.id,
          body: { status: 'completed' },
          ok: true,
          endpoint: payload.endpoint,
          headers: {},
          status: 200,
        });
      }
    });
    expect(
      testConnection(
        {
          name: 'test-name',
          path: 'test-path',
          version: '1.0.0',
          spec: { key: 'value' },
          env: [{ name: 'ENV_VAR', value: 'value' }],
        },
        'test-team',
        'source',
        false,
      ),
    ).resolves.toBe('some-connection-id');

    unsubscribe();
  });

  test('should handle connection failure', async () => {
    const { result } = renderHook(() => useTestConnection(pluginUiMessageHandler));

    const { testConnection } = result.current;

    const unsubscribe = formMessageHandler.subscribeToMessage('api_call_request', (payload) => {
      if (
        payload.endpoint === `${cloudQueryApiBaseUrl}/teams/test-team/sync-source-test-connections`
      ) {
        formMessageHandler.sendMessage('api_call_response', {
          id: payload.id,
          body: { id: 'some-connection-id' },
          ok: true,
          endpoint: payload.endpoint,
          headers: {},
          status: 201,
        });
      } else if (
        payload.endpoint ===
        `${cloudQueryApiBaseUrl}/teams/test-team/sync-source-test-connections/some-connection-id`
      ) {
        formMessageHandler.sendMessage('api_call_response', {
          id: payload.id,
          body: { status: 'failed' },
          ok: true,
          endpoint: payload.endpoint,
          headers: {},
          status: 200,
        });
      }
    });

    await expect(
      testConnection(
        {
          name: 'test-name',
          path: 'test-path',
          version: '1.0.0',
          spec: { key: 'value' },
          env: [{ name: 'ENV_VAR', value: 'value' }],
        },
        'test-team',
        'source',
        false,
      ),
    ).rejects.toMatchObject({ message: 'Unknown error' });

    unsubscribe();
  });

  test('should handle aborting the connection', async () => {
    const { result } = renderHook(() => useTestConnection(pluginUiMessageHandler));

    const { testConnection, cancelTestConnection } = result.current;

    const unsubscribe = formMessageHandler.subscribeToMessage('api_call_request', (payload) => {
      if (
        payload.endpoint === `${cloudQueryApiBaseUrl}/teams/test-team/sync-source-test-connections`
      ) {
        formMessageHandler.sendMessage('api_call_response', {
          id: payload.id,
          body: { id: 'some-connection-id' },
          ok: true,
          endpoint: payload.endpoint,
          headers: {},
          status: 201,
        });
      } else if (
        payload.endpoint ===
        `${cloudQueryApiBaseUrl}/teams/test-team/sync-source-test-connections/some-connection-id`
      ) {
        formMessageHandler.sendMessage('api_call_response', {
          id: payload.id,
          body: { status: 'in_progress' },
          ok: true,
          endpoint: payload.endpoint,
          headers: {},
          status: 200,
        });
      }
    });
    const promise = testConnection(
      {
        name: 'test-name',
        path: 'test-path',
        version: '1.0.0',
        spec: { key: 'value' },
        env: [{ name: 'ENV_VAR', value: 'value' }],
      },
      'test-team',
      'source',
      false,
    );

    act(() => {
      cancelTestConnection();
    });

    await expect(promise).rejects.toMatchObject({ name: 'AbortError' });

    unsubscribe();
  });

  test('should timeout after multiple attempts', async () => {
    const { result } = renderHook(() => useTestConnection(pluginUiMessageHandler));

    const { testConnection } = result.current;

    const unsubscribe = formMessageHandler.subscribeToMessage('api_call_request', (payload) => {
      if (
        payload.endpoint === `${cloudQueryApiBaseUrl}/teams/test-team/sync-source-test-connections`
      ) {
        formMessageHandler.sendMessage('api_call_response', {
          id: payload.id,
          body: { id: 'some-connection-id' },
          ok: true,
          endpoint: payload.endpoint,
          headers: {},
          status: 201,
        });
      } else if (
        payload.endpoint ===
        `${cloudQueryApiBaseUrl}/teams/test-team/sync-source-test-connections/some-connection-id`
      ) {
        formMessageHandler.sendMessage('api_call_response', {
          id: payload.id,
          body: { status: 'in_progress' },
          ok: true,
          endpoint: payload.endpoint,
          headers: {},
          status: 200,
        });
      }
    });

    const originalSetTimeout = global.setTimeout;
    global.setTimeout = jest.fn((callback) => {
      callback();
    }) as any;

    await expect(
      testConnection(
        {
          name: 'test-name',
          path: 'test-path',
          version: '1.0.0',
          spec: { key: 'value' },
          env: [{ name: 'ENV_VAR', value: 'value' }],
        },
        'test-team',
        'source',
        false,
      ),
    ).rejects.toMatchObject({ message: 'Connection timed out' });

    global.setTimeout = originalSetTimeout;
    unsubscribe();
  });
});

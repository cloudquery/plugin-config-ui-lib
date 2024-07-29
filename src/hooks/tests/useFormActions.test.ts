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
import { useFormActions } from '../useFormActions';

function getFormMessageHandler() {
  return new MessageHandler<
    FormMessageType,
    FormMessagePayload,
    PluginUiMessageType,
    PluginUiMessagePayload
  >(formMessageTypes, pluginUiMessageTypes, window.parent);
}

describe('useFormActions', () => {
  let pluginUiMessageHandler = getPluginUiMessageHandler();
  let formMessageHandler = getFormMessageHandler();
  let getValues: any = jest.fn(() => ({
    name: 'test-name',
    spec: { key: 'value' },
    envs: [{ name: 'ENV_VAR', value: 'value' }],
    tables: [],
    skipTables: [],
    migrateMode: 'forced' as const,
    writeMode: 'append' as const,
  }));

  beforeEach(() => {
    getValues = jest.fn(() => ({
      name: 'test-name',
      spec: { key: 'value' },
      envs: [{ name: 'ENV_VAR', value: 'value' }],
      connector_id: 'connector-id',
      tables: [],
      skipTables: [],
      migrateMode: 'mode',
      writeMode: 'mode',
    }));

    pluginUiMessageHandler = getPluginUiMessageHandler();
    formMessageHandler = getFormMessageHandler();
  });

  test('should handle test connection successfully', async () => {
    const { result } = renderHook(() =>
      useFormActions({
        getValues,
        pluginUiMessageHandler,
        teamName: 'test-team',
        pluginTeamName: 'plugin-team',
        pluginName: 'plugin-name',
        pluginKind: 'source',
        pluginVersion: '1.0.0',
        isUpdating: false,
      }),
    );

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

    expect(result.current.isTestingConnection).toBeFalsy();
    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.submitPayload).toBeUndefined();

    let promise: Promise<any>;
    await act(async () => {
      promise = result.current.handleTestConnection();
    });

    expect(result.current.isTestingConnection).toBeTruthy();
    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.submitPayload).toBeUndefined();

    await act(async () => {
      await promise;
    });

    expect(result.current.isTestingConnection).toBeFalsy();
    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.submitPayload).toEqual({
      name: 'test-name',
      spec: { key: 'value' },
      envs: [{ name: 'ENV_VAR', value: 'value' }],
      tables: [],
      skipTables: [],
      connector_id: 'connector-id',
      migrateMode: 'mode',
      writeMode: 'mode',
      connectionId: 'some-connection-id',
    });

    unsubscribe();
  });

  test('should handle test connection failure', async () => {
    const { result } = renderHook(() =>
      useFormActions({
        getValues,
        pluginUiMessageHandler,
        teamName: 'test-team',
        pluginTeamName: 'plugin-team',
        pluginName: 'plugin-name',
        pluginKind: 'source',
        pluginVersion: '1.0.0',
        isUpdating: false,
      }),
    );

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

    await act(async () => {
      await result.current.handleTestConnection();
    });

    expect(result.current.testConnectionError).toBe('Unknown error');
    expect(result.current.isTestingConnection).toBeFalsy();
    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.submitPayload).toBeUndefined();

    unsubscribe();
  });

  test('should handle test connection abort error', async () => {
    const { result } = renderHook(() =>
      useFormActions({
        getValues,
        pluginUiMessageHandler,
        teamName: 'test-team',
        pluginTeamName: 'plugin-team',
        pluginName: 'plugin-name',
        pluginKind: 'source',
        pluginVersion: '1.0.0',
        isUpdating: false,
      }),
    );

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

    let promise: Promise<any>;

    await act(async () => {
      promise = result.current.handleTestConnection();
    });

    expect(result.current.isTestingConnection).toBeTruthy();
    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.submitPayload).toBeUndefined();

    await act(async () => {
      result.current.handleCancelTestConnection();

      await promise;
    });

    expect(result.current.isTestingConnection).toBeFalsy();
    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.submitPayload).toBeUndefined();
    expect(result.current.testConnectionError).toBeUndefined();

    unsubscribe();
  });

  test('should handle submit successfully', async () => {
    const { result, rerender } = renderHook(() =>
      useFormActions({
        getValues,
        pluginUiMessageHandler,
        teamName: 'test-team',
        pluginTeamName: 'plugin-team',
        pluginName: 'plugin-name',
        pluginKind: 'source',
        pluginVersion: '1.0.0',
        isUpdating: false,
      }),
    );

    const unsubscribe = formMessageHandler.subscribeToMessage('api_call_request', (payload) => {
      switch (payload.endpoint) {
        case `${cloudQueryApiBaseUrl}/teams/test-team/sync-source-test-connections`: {
          formMessageHandler.sendMessage('api_call_response', {
            id: payload.id,
            body: { id: 'some-connection-id' },
            ok: true,
            endpoint: payload.endpoint,
            headers: {},
            status: 201,
          });

          break;
        }
        case `${cloudQueryApiBaseUrl}/teams/test-team/sync-source-test-connections/some-connection-id`: {
          formMessageHandler.sendMessage('api_call_response', {
            id: payload.id,
            body: { status: 'completed' },
            ok: true,
            endpoint: payload.endpoint,
            headers: {},
            status: 200,
          });

          break;
        }
        case `${cloudQueryApiBaseUrl}/teams/test-team/sync-source-test-connections/some-connection-id/promote`: {
          formMessageHandler.sendMessage('api_call_response', {
            id: payload.id,
            body: {},
            ok: true,
            endpoint: payload.endpoint,
            headers: {},
            status: 200,
          });

          break;
        }
        case `${cloudQueryApiBaseUrl}/teams/test-team/sync-sources/test-name`: {
          formMessageHandler.sendMessage('api_call_response', {
            id: payload.id,
            body: {},
            ok: true,
            endpoint: payload.endpoint,
            headers: {},
            status: 200,
          });

          break;
        }
        // No default
      }
    });

    expect(result.current.isTestingConnection).toBeFalsy();
    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.submitPayload).toBeUndefined();
    expect(result.current.testConnectionError).toBeUndefined();

    let testConnectionPromise: Promise<any>;
    await act(async () => {
      testConnectionPromise = result.current.handleTestConnection();
    });

    expect(result.current.isTestingConnection).toBeTruthy();
    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.submitPayload).toBeUndefined();
    expect(result.current.testConnectionError).toBeUndefined();

    let submitPromise: Promise<any>;
    await act(async () => {
      await testConnectionPromise;
    });

    rerender();

    await act(async () => {
      submitPromise = result.current.handleSubmit();
    });

    expect(result.current.isTestingConnection).toBeFalsy();
    expect(result.current.isSubmitting).toBeTruthy();
    expect(result.current.submitPayload).toEqual({
      spec: { key: 'value' },
      envs: [{ name: 'ENV_VAR', value: 'value' }],
      tables: [],
      skipTables: [],
      connector_id: 'connector-id',
      migrateMode: 'mode',
      writeMode: 'mode',
      connectionId: 'some-connection-id',
      name: 'test-name',
    });
    expect(result.current.testConnectionError).toBeUndefined();

    await act(async () => {
      await submitPromise;
    });

    expect(result.current.isTestingConnection).toBeFalsy();
    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.submitPayload).toBeUndefined();
    expect(result.current.testConnectionError).toBeUndefined();

    unsubscribe();
  });

  test('should handle submit with submit data successfully', async () => {
    const { result, rerender } = renderHook(() =>
      useFormActions({
        getValues,
        pluginUiMessageHandler,
        teamName: 'test-team',
        pluginTeamName: 'plugin-team',
        pluginName: 'plugin-name',
        pluginKind: 'source',
        pluginVersion: '1.0.0',
        isUpdating: false,
      }),
    );

    let tablesPayloadModified = false;
    const unsubscribe = formMessageHandler.subscribeToMessage('api_call_request', (payload) => {
      switch (payload.endpoint) {
        case `${cloudQueryApiBaseUrl}/teams/test-team/sync-source-test-connections`: {
          formMessageHandler.sendMessage('api_call_response', {
            id: payload.id,
            body: { id: 'some-connection-id' },
            ok: true,
            endpoint: payload.endpoint,
            headers: {},
            status: 201,
          });

          break;
        }
        case `${cloudQueryApiBaseUrl}/teams/test-team/sync-source-test-connections/some-connection-id`: {
          formMessageHandler.sendMessage('api_call_response', {
            id: payload.id,
            body: { status: 'completed' },
            ok: true,
            endpoint: payload.endpoint,
            headers: {},
            status: 200,
          });

          break;
        }
        case `${cloudQueryApiBaseUrl}/teams/test-team/sync-source-test-connections/some-connection-id/promote`: {
          if (payload.body.tables[0] === '*') {
            tablesPayloadModified = true;
          }
          formMessageHandler.sendMessage('api_call_response', {
            id: payload.id,
            body: {},
            ok: true,
            endpoint: payload.endpoint,
            headers: {},
            status: 200,
          });

          break;
        }
        case `${cloudQueryApiBaseUrl}/teams/test-team/sync-sources/test-name`: {
          formMessageHandler.sendMessage('api_call_response', {
            id: payload.id,
            body: {},
            ok: true,
            endpoint: payload.endpoint,
            headers: {},
            status: 200,
          });

          break;
        }
        // No default
      }
    });

    expect(result.current.isTestingConnection).toBeFalsy();
    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.submitPayload).toBeUndefined();
    expect(result.current.testConnectionError).toBeUndefined();

    let testConnectionPromise: Promise<any>;
    await act(async () => {
      testConnectionPromise = result.current.handleTestConnection();
    });

    expect(result.current.isTestingConnection).toBeTruthy();
    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.submitPayload).toBeUndefined();
    expect(result.current.testConnectionError).toBeUndefined();

    let submitPromise: Promise<any>;
    await act(async () => {
      await testConnectionPromise;
    });

    rerender();

    await act(async () => {
      submitPromise = result.current.handleSubmit({
        tables: ['*'],
      });
    });

    expect(result.current.isTestingConnection).toBeFalsy();
    expect(result.current.isSubmitting).toBeTruthy();
    expect(result.current.submitPayload).toEqual({
      spec: { key: 'value' },
      envs: [{ name: 'ENV_VAR', value: 'value' }],
      tables: [],
      skipTables: [],
      connector_id: 'connector-id',
      migrateMode: 'mode',
      writeMode: 'mode',
      connectionId: 'some-connection-id',
      name: 'test-name',
    });
    expect(result.current.testConnectionError).toBeUndefined();

    await act(async () => {
      await submitPromise;
    });

    expect(tablesPayloadModified).toBeTruthy();
    expect(result.current.isTestingConnection).toBeFalsy();
    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.submitPayload).toBeUndefined();
    expect(result.current.testConnectionError).toBeUndefined();

    unsubscribe();
  });

  test('should handle submit failure', async () => {
    const { result, rerender } = renderHook(() =>
      useFormActions({
        getValues,
        pluginUiMessageHandler,
        teamName: 'test-team',
        pluginTeamName: 'plugin-team',
        pluginName: 'plugin-name',
        pluginKind: 'source',
        pluginVersion: '1.0.0',
        isUpdating: false,
      }),
    );

    const unsubscribe = formMessageHandler.subscribeToMessage('api_call_request', (payload) => {
      switch (payload.endpoint) {
        case `${cloudQueryApiBaseUrl}/teams/test-team/sync-source-test-connections`: {
          formMessageHandler.sendMessage('api_call_response', {
            id: payload.id,
            body: { id: 'some-connection-id' },
            ok: true,
            endpoint: payload.endpoint,
            headers: {},
            status: 201,
          });

          break;
        }
        case `${cloudQueryApiBaseUrl}/teams/test-team/sync-source-test-connections/some-connection-id`: {
          formMessageHandler.sendMessage('api_call_response', {
            id: payload.id,
            body: { status: 'completed' },
            ok: true,
            endpoint: payload.endpoint,
            headers: {},
            status: 200,
          });

          break;
        }
        case `${cloudQueryApiBaseUrl}/teams/test-team/sync-source-test-connections/some-connection-id/promote`: {
          formMessageHandler.sendMessage('api_call_response', {
            id: payload.id,
            body: {},
            ok: true,
            endpoint: payload.endpoint,
            headers: {},
            status: 200,
          });

          break;
        }
        case `${cloudQueryApiBaseUrl}/teams/test-team/sync-sources/test-name`: {
          formMessageHandler.sendMessage('api_call_response', {
            id: payload.id,
            body: new Error('Submit failed'),
            ok: false,
            endpoint: payload.endpoint,
            headers: {},
            status: 422,
          });

          break;
        }
        // No default
      }
    });

    expect(result.current.isTestingConnection).toBeFalsy();
    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.submitPayload).toBeUndefined();
    expect(result.current.testConnectionError).toBeUndefined();

    let testConnectionPromise: Promise<any>;
    await act(async () => {
      testConnectionPromise = result.current.handleTestConnection();
    });

    expect(result.current.isTestingConnection).toBeTruthy();
    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.submitPayload).toBeUndefined();
    expect(result.current.testConnectionError).toBeUndefined();

    let submitPromise: Promise<any>;
    await act(async () => {
      await testConnectionPromise;
    });

    rerender();

    await act(async () => {
      submitPromise = result.current.handleSubmit();
    });

    expect(result.current.isTestingConnection).toBeFalsy();
    expect(result.current.isSubmitting).toBeTruthy();
    expect(result.current.submitPayload).toEqual({
      spec: { key: 'value' },
      envs: [{ name: 'ENV_VAR', value: 'value' }],
      tables: [],
      skipTables: [],
      connector_id: 'connector-id',
      migrateMode: 'mode',
      writeMode: 'mode',
      connectionId: 'some-connection-id',
      name: 'test-name',
    });
    expect(result.current.testConnectionError).toBeUndefined();

    await act(async () => {
      await submitPromise;
    });

    rerender();

    expect(result.current.isTestingConnection).toBeFalsy();
    expect(result.current.isSubmitting).toBeFalsy();
    expect(result.current.submitPayload).toBeUndefined();
    expect(result.current.submitError).toMatchObject({ message: 'Submit failed' });

    unsubscribe();
  });

  test('should handle cancel test connection', async () => {
    const { result } = renderHook(() =>
      useFormActions({
        getValues,
        pluginUiMessageHandler,
        teamName: 'test-team',
        pluginTeamName: 'plugin-team',
        pluginName: 'plugin-name',
        pluginKind: 'source',
        pluginVersion: '1.0.0',
        isUpdating: false,
      }),
    );

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

    let promise: Promise<any>;

    act(() => {
      promise = result.current.handleTestConnection();
    });

    await act(async () => {
      result.current.handleCancelTestConnection();
      await expect(promise).resolves.toBe(null);
    });

    expect(result.current.testConnectionError).toBeUndefined();
    expect(result.current.isTestingConnection).toBe(false);
    expect(result.current.submitPayload).toBeUndefined();

    unsubscribe();
  });

  test('should handle go to previous step', async () => {
    const { result } = renderHook(() =>
      useFormActions({
        getValues,
        pluginUiMessageHandler,
        teamName: 'test-team',
        pluginTeamName: 'plugin-team',
        pluginName: 'plugin-name',
        pluginKind: 'source',
        pluginVersion: '1.0.0',
        isUpdating: false,
      }),
    );

    const callback = jest.fn();

    formMessageHandler.subscribeToMessageOnce('go_to_previous_step', callback);

    result.current.handleGoToPreviousStep();

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should handle cancel', async () => {
    const { result } = renderHook(() =>
      useFormActions({
        getValues,
        pluginUiMessageHandler,
        teamName: 'test-team',
        pluginTeamName: 'plugin-team',
        pluginName: 'plugin-name',
        pluginKind: 'source',
        pluginVersion: '1.0.0',
        isUpdating: false,
      }),
    );

    const callback = jest.fn();

    formMessageHandler.subscribeToMessageOnce('cancel', callback);

    result.current.handleCancel();

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('should handle delete', async () => {
    const { result } = renderHook(() =>
      useFormActions({
        getValues,
        pluginUiMessageHandler,
        teamName: 'test-team',
        pluginTeamName: 'plugin-team',
        pluginName: 'plugin-name',
        pluginKind: 'source',
        pluginVersion: '1.0.0',
        isUpdating: false,
      }),
    );

    const callback = jest.fn();

    formMessageHandler.subscribeToMessageOnce('delete', callback);

    const unsubscribe = formMessageHandler.subscribeToMessage('api_call_request', (payload) => {
      if (payload.endpoint === `${cloudQueryApiBaseUrl}/teams/test-team/sync-sources/test-name`) {
        formMessageHandler.sendMessage('api_call_response', {
          id: payload.id,
          body: {},
          ok: true,
          endpoint: payload.endpoint,
          headers: {},
          status: 200,
        });
      }
    });

    await act(async () => {
      await result.current.handleDelete();
    });

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(callback).toHaveBeenCalledTimes(1);

    unsubscribe();
  });
});

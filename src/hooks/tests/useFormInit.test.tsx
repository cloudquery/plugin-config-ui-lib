import { act } from 'react';

import {
  MessageHandler,
  FormMessagePayload,
  FormMessageType,
  PluginUiMessagePayload,
  PluginUiMessageType,
  formMessageTypes,
  pluginUiMessageTypes,
  getPluginUiMessageHandler,
} from '@cloudquery/plugin-config-ui-connector';
import { renderHook } from '@testing-library/react';

import { useFormInit } from '../useFormInit';

describe('usePluginUiFormInit', () => {
  test('no initial values', async () => {
    const pluginUiMessageHandler = getPluginUiMessageHandler();
    const { rerender, result } = renderHook(() => useFormInit(pluginUiMessageHandler, false));
    expect(result.current).toEqual({
      initialized: false,
      initialValues: undefined,
      apiAuthorizationToken: '',
    });

    await act(async () => {
      const formMessageHandler = new MessageHandler<
        FormMessageType,
        FormMessagePayload,
        PluginUiMessageType,
        PluginUiMessagePayload
      >(formMessageTypes, pluginUiMessageTypes, window.parent);
      formMessageHandler.sendMessage('init', {
        initialValues: undefined,
        apiAuthorizationToken: 'test',
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    rerender();
    expect(result.current).toEqual({
      initialized: true,
      initialValues: undefined,
      apiAuthorizationToken: 'test',
    });
  });

  test('initial values', async () => {
    const pluginUiMessageHandler = getPluginUiMessageHandler();
    const { rerender, result } = renderHook(() => useFormInit(pluginUiMessageHandler, false));
    expect(result.current).toEqual({
      initialized: false,
      initialValues: undefined,
      apiAuthorizationToken: '',
    });

    await act(async () => {
      const formMessageHandler = new MessageHandler<
        FormMessageType,
        FormMessagePayload,
        PluginUiMessageType,
        PluginUiMessagePayload
      >(formMessageTypes, pluginUiMessageTypes, window.parent);
      formMessageHandler.sendMessage('init', {
        apiAuthorizationToken: 'test',
        initialValues: {
          tables: ['*'],
          migrateMode: undefined,
          envs: [],
          spec: {
            connection_string: 'test',
          },
          skipTables: [],
          writeMode: 'append',
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    rerender();
    expect(result.current).toEqual({
      initialized: true,
      initialValues: {
        tables: ['*'],
        migrateMode: undefined,
        envs: [],
        spec: {
          connection_string: 'test',
        },
        skipTables: [],
        writeMode: 'append',
      },
      apiAuthorizationToken: 'test',
    });
  });

  test('initial values', async () => {
    const pluginUiMessageHandler = getPluginUiMessageHandler();
    const { rerender, result } = renderHook(() => useFormInit(pluginUiMessageHandler, false));
    expect(result.current).toEqual({
      initialized: false,
      initialValues: undefined,
      apiAuthorizationToken: '',
    });
    const formMessageHandler = new MessageHandler<
      FormMessageType,
      FormMessagePayload,
      PluginUiMessageType,
      PluginUiMessagePayload
    >(formMessageTypes, pluginUiMessageTypes, window.parent);

    await act(async () => {
      formMessageHandler.sendMessage('init', {
        apiAuthorizationToken: 'test',
        initialValues: {
          tables: ['*'],
          migrateMode: undefined,
          envs: [],
          spec: {
            connection_string: 'test',
          },
          skipTables: [],
          writeMode: 'append',
        },
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    rerender();
    expect(result.current).toEqual({
      initialized: true,
      initialValues: {
        tables: ['*'],
        migrateMode: undefined,
        envs: [],
        spec: {
          connection_string: 'test',
        },
        skipTables: [],
        writeMode: 'append',
      },
      apiAuthorizationToken: 'test',
    });

    await act(async () => {
      formMessageHandler.sendMessage('api_authorization_token_changed', {
        token: 'changed',
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    rerender();
    expect(result.current).toEqual({
      initialized: true,
      initialValues: {
        tables: ['*'],
        migrateMode: undefined,
        envs: [],
        spec: {
          connection_string: 'test',
        },
        skipTables: [],
        writeMode: 'append',
      },
      apiAuthorizationToken: 'changed',
    });
  });
});

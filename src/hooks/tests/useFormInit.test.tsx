import { describe, test, expect } from 'vitest';
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

const emptyUser = {
  name: '',
  email: '',
  id: '',
};

const exampleUser = {
  name: 'test',
  email: 'test',
  id: 'test',
};

describe('usePluginUiFormInit', () => {
  test('no initial values', async () => {
    console.log('here', window)
    const pluginUiMessageHandler = getPluginUiMessageHandler();
    const { rerender, result } = renderHook(() => useFormInit(pluginUiMessageHandler));
    expect(result.current).toEqual({
      initialized: false,
      initialValues: undefined,
      teamName: '',
      isManagedDestination: false,
      user: emptyUser,
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
        teamName: 'test',
        context: 'wizard',
        user: exampleUser,
      });
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    rerender();
    expect(result.current).toEqual({
      initialized: true,
      initialValues: undefined,
      teamName: 'test',
      context: 'wizard',
      isManagedDestination: false,
      user: exampleUser,
    });
  });

  test('initial values', async () => {
    const pluginUiMessageHandler = getPluginUiMessageHandler();
    const { rerender, result } = renderHook(() => useFormInit(pluginUiMessageHandler));
    expect(result.current).toEqual({
      initialized: false,
      initialValues: undefined,
      teamName: '',
      isManagedDestination: false,
      user: emptyUser,
    });

    await act(async () => {
      const formMessageHandler = new MessageHandler<
        FormMessageType,
        FormMessagePayload,
        PluginUiMessageType,
        PluginUiMessagePayload
      >(formMessageTypes, pluginUiMessageTypes, window.parent);
      formMessageHandler.sendMessage('init', {
        initialValues: {
          name: 'test',
          tables: ['*'],
          migrateMode: undefined,
          envs: [],
          spec: {
            connection_string: 'test',
          },
          skipTables: [],
          writeMode: 'append',
        },
        teamName: 'test',
        context: 'wizard',
        user: exampleUser,
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
        name: 'test',
      },
      teamName: 'test',
      context: 'wizard',
      isManagedDestination: false,
      user: exampleUser,
    });
  });

  test('initial values', async () => {
    const pluginUiMessageHandler = getPluginUiMessageHandler();
    const { rerender, result } = renderHook(() => useFormInit(pluginUiMessageHandler));
    expect(result.current).toEqual({
      initialized: false,
      initialValues: undefined,
      teamName: '',
      isManagedDestination: false,
      user: emptyUser,
    });
    const formMessageHandler = new MessageHandler<
      FormMessageType,
      FormMessagePayload,
      PluginUiMessageType,
      PluginUiMessagePayload
    >(formMessageTypes, pluginUiMessageTypes, window.parent);

    await act(async () => {
      formMessageHandler.sendMessage('init', {
        initialValues: {
          name: 'test',
          tables: ['*'],
          migrateMode: undefined,
          envs: [],
          spec: {
            connection_string: 'test',
          },
          skipTables: [],
          writeMode: 'append',
        },
        teamName: 'test',
        context: 'wizard',
        user: exampleUser,
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
        name: 'test',
      },
      teamName: 'test',
      context: 'wizard',
      isManagedDestination: false,
      user: exampleUser,
    });
  });
});

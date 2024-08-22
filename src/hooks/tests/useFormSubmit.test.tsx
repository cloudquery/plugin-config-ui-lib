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

import { useFormSubmit } from '../useFormSubmit';

const formMessageHandler = new MessageHandler<
  FormMessageType,
  FormMessagePayload,
  PluginUiMessageType,
  PluginUiMessagePayload
>(formMessageTypes, pluginUiMessageTypes, window.parent);

describe('usePluginUiFormSubmit', () => {
  let originalPostMessage: typeof window.postMessage;

  afterEach(() => {
    window.parent.postMessage = originalPostMessage;
    jest.restoreAllMocks();
  });

  test('validation succeeded', async () => {
    const onValidate = jest.fn(() =>
      Promise.resolve({ values: { email: 'john@doe.com', name: 'John Doe' } }),
    );
    renderHook(() => useFormSubmit(onValidate as any, getPluginUiMessageHandler()));

    await act(async () => {
      formMessageHandler.sendMessage('validate');

      originalPostMessage = window.parent.postMessage;
      window.parent.postMessage = jest.fn();
      jest.spyOn(window, 'addEventListener');
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(onValidate).toHaveBeenCalledTimes(1);
    expect(window.parent.postMessage).toHaveBeenCalledWith(
      {
        type: 'validation_passed',
        payload: { values: { email: 'john@doe.com', name: 'John Doe' } },
        id: 'plugin-ui-connector-iframe',
      },
      '*',
    );
  });

  test('validation failed', async () => {
    const onValidate = jest.fn(() => Promise.resolve({ errors: { key: 'value' } }));
    renderHook(() => useFormSubmit(onValidate as any, getPluginUiMessageHandler()));

    await act(async () => {
      formMessageHandler.sendMessage('validate');

      originalPostMessage = window.parent.postMessage;
      window.parent.postMessage = jest.fn();
      jest.spyOn(window, 'addEventListener');
      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    expect(onValidate).toHaveBeenCalledTimes(1);
    expect(window.parent.postMessage).toHaveBeenCalledWith(
      {
        type: 'validation_failed',
        payload: { errors: { key: 'value' } },
        id: expect.any(String),
      },
      '*',
    );
  });

  test('formDisabled state', async () => {
    const onValidate = jest.fn(async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));

      expect(result.current.formDisabled).toBe(true);

      return Promise.resolve({ values: { email: 'john@doe.com', name: 'John Doe' } });
    });

    const { result } = renderHook(() =>
      useFormSubmit(onValidate as any, getPluginUiMessageHandler()),
    );

    expect(result.current.formDisabled).toBe(false);

    await act(async () => {
      formMessageHandler.sendMessage('validate');

      originalPostMessage = window.parent.postMessage;
      window.parent.postMessage = jest.fn();
      jest.spyOn(window, 'addEventListener');

      await new Promise((resolve) => setTimeout(resolve, 100));
    });

    await expect(onValidate).toHaveBeenCalledTimes(1);
    expect(window.parent.postMessage).toHaveBeenCalledWith(
      {
        type: 'validation_passed',
        payload: { values: { email: 'john@doe.com', name: 'John Doe' } },
        id: 'plugin-ui-connector-iframe',
      },
      '*',
    );

    expect(result.current.formDisabled).toBe(false);
  });
});

import { getPluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';
import { render } from '@testing-library/react';

import ResizeObserver from 'resize-observer-polyfill';

import { useFormHeightChange } from '../useFormHeightChange';

global.ResizeObserver = ResizeObserver;

const App = () => {
  useFormHeightChange(getPluginUiMessageHandler());

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};

let originalPostMessage: typeof window.postMessage;

beforeEach(() => {
  originalPostMessage = window.parent.postMessage;
  window.parent.postMessage = jest.fn();
  jest.spyOn(window, 'addEventListener');
});

afterEach(() => {
  window.parent.postMessage = originalPostMessage;
  jest.restoreAllMocks();
});

test('usePluginUiFormHeightChange', async () => {
  render(<App />);

  expect(window.parent.postMessage).toBeCalledWith(
    {
      type: 'height_changed',
      payload: { height: 0 },
      id: expect.any(String),
    },
    '*',
  );
});

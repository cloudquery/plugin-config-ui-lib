import { useEffect } from 'react';

import {
  PluginUiMessageHandler,
  PluginUiMessagePayload,
} from '@cloudquery/plugin-config-ui-connector';

/**
 * This hook is used to notify CloudQuery Cloud App about the current values of the form.
 *
 * @public
 */
export function useFormCurrentValues(
  pluginUiMessageHandler: PluginUiMessageHandler,
  getCurrentValues: () => PluginUiMessagePayload['current_values']['values'],
) {
  useEffect(() => {
    return pluginUiMessageHandler.subscribeToMessage('request_current_values', () => {
      pluginUiMessageHandler.sendMessage('current_values', {
        values: getCurrentValues(),
      });
    });
  }, [getCurrentValues, pluginUiMessageHandler]);
}

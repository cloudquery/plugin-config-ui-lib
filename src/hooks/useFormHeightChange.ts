import { useEffect } from 'react';

import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';

/**
 * This hook is used to notify CloudQuery Cloud App
 * about the height change of the plugin UI form.
 *
 * @public
 */
export function useFormHeightChange(pluginUiMessageHandler: PluginUiMessageHandler) {
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      pluginUiMessageHandler.sendMessage('height_changed', {
        height: document.body?.scrollHeight ?? 0,
      });
    });

    observer.observe(document.body);

    pluginUiMessageHandler.sendMessage('height_changed', {
      height: document.body?.scrollHeight ?? 0,
    });

    return () => {
      observer.disconnect();
    };
  }, [pluginUiMessageHandler]);
}

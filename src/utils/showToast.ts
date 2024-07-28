import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';

/**
 * Show toast notification
 *
 * @public
 */
export function showToast(
  pluginUiMessageHandler: PluginUiMessageHandler,
  type: 'error' | 'success' | 'blank',
  message: string,
) {
  pluginUiMessageHandler.sendMessage('show_toast', { type, message });
}

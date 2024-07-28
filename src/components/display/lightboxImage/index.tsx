import React, { ImgHTMLAttributes, useCallback } from 'react';

import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';

/**
 * This component displays an image that can be opened in a lightbox.
 *
 * @public
 */
export function LightboxImage({
  pluginUiMessageHandler,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { pluginUiMessageHandler: PluginUiMessageHandler }) {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.code === 'Enter' || event.code === 'Space') {
        event.preventDefault();
        pluginUiMessageHandler.sendMessage('show_lightbox', {
          alt: props.alt || '',
          src: props.src || '',
        });
      }
    },
    [pluginUiMessageHandler, props.alt, props.src],
  );

  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      pluginUiMessageHandler.sendMessage('show_lightbox', {
        ...props,
        alt: props.alt || '',
        src: props.src || '',
      });
    },
    [pluginUiMessageHandler, props],
  );

  return (
    <button
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', width: '100%' }}
      onClick={handleOpen}
      onKeyDown={handleKeyDown}
    >
      <img {...props} style={{ width: 'inherit', display: 'block', ...props.style }} />
    </button>
  );
}

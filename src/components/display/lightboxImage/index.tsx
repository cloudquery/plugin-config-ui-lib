import React, { ImgHTMLAttributes, useCallback } from 'react';

import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';

/**
 * @public
 */
export type LightboxImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  pluginUiMessageHandler: PluginUiMessageHandler;
};

/**
 * This component displays an image that can be opened in a lightbox.
 *
 * @public
 */
export function LightboxImage({ pluginUiMessageHandler, ...props }: LightboxImageProps) {
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
        src: props.src ? getFullImageUrl(props.src) : '',
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

function getFullImageUrl(imageUrl) {
  if (!imageUrl) return '';

  // If the imageUrl starts with http, it's already an absolute URL
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  // If the imageUrl starts with /, it is relative to the domain root
  if (imageUrl.startsWith('/')) {
    return `${window.location.origin}${imageUrl}`;
  }

  // Otherwise, it is a relative path, append to the current URL path
  const currentUrl = window.location.href;
  const currentPath = currentUrl.slice(0, Math.max(0, currentUrl.lastIndexOf('/') + 1));

  return `${currentPath}${imageUrl}`;
}

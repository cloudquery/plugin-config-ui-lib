import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';
import Link, { LinkProps } from '@mui/material/Link';
import React, { ReactNode } from 'react';

/**
 * @public
 */
export type PluginLinkProps = Omit<LinkProps, 'onClick' | 'children' | 'href'> & {
  children: ReactNode;
  href: string;
  pluginUiMessageHandler: PluginUiMessageHandler;
}

/**
 * Wrapper for MUI Link component that opens a URL in the plugin UI top app.
 *
 * @public
 */
export function PluginLink({ children, href, pluginUiMessageHandler, ...linkProps }: PluginLinkProps) {
  return (
    <Link
      {...linkProps}
      sx={{ cursor: 'pointer', ...(linkProps.sx) }}
      onClick={() => {
        pluginUiMessageHandler.sendMessage('open_url', {
          url: href,
        });
      }}
    >
      {children}
    </Link>
  );
}
import { ReactNode } from 'react';

import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';

/**
 * @public
 */
export type LinkProps = Omit<MuiLinkProps, 'onClick' | 'children' | 'href'> & {
  children: ReactNode;
  href: string;
  pluginUiMessageHandler: PluginUiMessageHandler;
};

/**
 * Wrapper for MUI Link component that opens a URL in the plugin UI top app.
 *
 * @public
 */
export function Link({ children, href, pluginUiMessageHandler, ...linkProps }: LinkProps) {
  return (
    <MuiLink
      {...linkProps}
      sx={{ cursor: 'pointer', ...linkProps.sx }}
      onClick={() => {
        pluginUiMessageHandler.sendMessage('open_url', {
          url: href,
        });
      }}
    >
      {children}
    </MuiLink>
  );
}

import { ReactNode } from 'react';

import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';

/**
 * @public
 */
export type LinkProps = Omit<MuiLinkProps, 'onClick' | 'children' | 'href'> & {
  children: ReactNode;
  href: string;
};

/**
 * Wrapper for MUI Link component that opens a URL in the plugin UI top app.
 *
 * @public
 */
export function Link({ children, href, ...linkProps }: LinkProps) {
  return (
    <MuiLink
      {...linkProps}
      sx={{ cursor: 'pointer', ...linkProps.sx }}
      onClick={() => {
        window.open(href, '_blank');
      }}
    >
      {children}
    </MuiLink>
  );
}

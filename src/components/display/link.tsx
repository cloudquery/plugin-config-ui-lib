import React, { ReactNode } from 'react';

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
export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...linkProps }, ref) => {
    return (
      <MuiLink
        ref={ref}
        {...linkProps}
        sx={{ cursor: 'pointer', ...linkProps.sx }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </MuiLink>
    );
  },
);

Link.displayName = 'Link';

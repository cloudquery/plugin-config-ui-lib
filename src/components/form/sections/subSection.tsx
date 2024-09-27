import React from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography/Typography';

/**
 * @public
 */
export interface SubSectionProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
}

/**
 * @public
 */
export function SubSection({ children, title, subtitle }: SubSectionProps) {
  return (
    <Stack
      sx={{
        gap: 2,
      }}
    >
      {(title || subtitle) && (
        <Stack
          sx={{
            gap: 1,
          }}
        >
          {title && <Typography variant="h6">{title}</Typography>}
          {subtitle && (
            <Typography variant="body2" color="textSecondary">
              {subtitle}
            </Typography>
          )}
        </Stack>
      )}
      {children}
    </Stack>
  );
}

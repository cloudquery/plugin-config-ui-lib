import Stack from '@mui/material/Stack';
import React from 'react';

export interface SectionsProps {
  children: React.ReactNode;
}

/**
 * @public
 */
export function Sections({ children }: SectionsProps) {
  return <Stack gap={3}>{children}</Stack>;
}

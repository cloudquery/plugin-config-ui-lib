import { ReactNode } from 'react';

import Stack from '@mui/material/Stack';
import { Controller } from 'react-hook-form';

import { ExclusiveToggle } from '../../inputs/exclusiveToggle';

/**
 * @public
 */
export interface ControlExclusiveToggleFieldProps {
  name: string;
  options: { label: string; value: string | number }[];
  // Slot for title/subtitle/etc. above the toggle itself
  children?: ReactNode;
}

/**
 * This component is a react-hook-form wrapper around the ExclusiveToggle component.
 *
 * @public
 */
export function ControlExclusiveToggleField({
  name,
  options,
  children,
}: ControlExclusiveToggleFieldProps) {
  return (
    <Stack gap={1}>
      {children}
      <Controller
        name={name}
        render={({ field }) => <ExclusiveToggle options={options} {...field} />}
      />
    </Stack>
  );
}

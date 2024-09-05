import { ReactNode } from 'react';

import Stack from '@mui/system/Stack';
import { Controller } from 'react-hook-form';

import { ExclusiveToggle } from '../../components';

/**
 * @public
 */
export interface ControlExclusiveToggleProps {
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
export function ControlExclusiveToggle({ name, options, children }: ControlExclusiveToggleProps) {
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

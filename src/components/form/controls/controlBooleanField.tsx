import { ReactNode } from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import { Controller } from 'react-hook-form';

import { getFieldHelperText } from '../../../utils';

/**
 * @public
 */
export interface ControlBooleanFieldProps {
  name: string;
  type: 'toggle' | 'checkbox';
  helperText?: ReactNode;
  label: ReactNode;
}

/**
 * This component is a react-hook-form wrapper around the MUI Switch or Checkbox component.
 *
 * @public
 */
export function ControlBooleanField({
  name,
  label,
  type = 'toggle',
  helperText = '',
}: ControlBooleanFieldProps) {
  const ConcreteComponent = type === 'toggle' ? Switch : Checkbox;

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <FormControl>
          <FormControlLabel
            control={<ConcreteComponent checked={field.value} {...field} />}
            label={label}
          />
          <FormHelperText error={!!fieldState.error?.message}>
            {getFieldHelperText(fieldState.error?.message, helperText)}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}

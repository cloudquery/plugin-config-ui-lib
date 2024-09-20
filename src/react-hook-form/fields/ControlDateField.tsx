import { ReactNode } from 'react';

import { TextFieldProps } from '@mui/material/TextField';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from 'react-hook-form';

import { getDefaultDate } from '../../utils/date';
import { getFieldHelperText } from '../../utils/getFieldHelperText';

/**
 * @public
 */
export interface ControlDateFieldProps {
  name: string;
  helperText?: ReactNode;
  label: ReactNode;
  disabled?: boolean;
  clearable?: boolean;
  InputProps?: TextFieldProps['InputProps'];
}

/**
 * This component is a react-hook-form wrapper around the MUI Date component.
 *
 * @public
 */
export function ControlDateField({
  name,
  label,
  helperText = '',
  disabled,
  clearable = true,
  InputProps,
}: ControlDateFieldProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            disableFuture={true}
            disabled={disabled}
            clearable={clearable}
            label={label}
            slotProps={{
              textField: {
                error: !!fieldState.error,
                name: field.name,
                helperText: getFieldHelperText(fieldState.error?.message, helperText),
                InputProps,
              },
            }}
            {...field}
            value={getDefaultDate(field.value)}
          />
        </LocalizationProvider>
      )}
    />
  );
}

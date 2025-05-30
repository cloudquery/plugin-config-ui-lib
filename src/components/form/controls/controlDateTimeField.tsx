import { ReactNode } from 'react';

import { TextFieldProps } from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Controller } from 'react-hook-form';

import { getFieldHelperText } from '../../../utils';
import { getDefaultDate } from '../../../utils/date';

/**
 * @public
 */
export interface ControlDateTimeFieldProps {
  name: string;
  helperText?: ReactNode;
  label: ReactNode;
  disabled?: boolean;
  clearable?: boolean;
  InputProps?: TextFieldProps['InputProps'];
}

/**
 * This component is a react-hook-form wrapper around the MUI DateTime component.
 *
 * @public
 */
export function ControlDateTimeField({
  name,
  label,
  helperText = '',
  disabled,
  clearable = true,
  InputProps,
}: ControlDateTimeFieldProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimeField
            disableFuture={true}
            disabled={disabled}
            clearable={clearable}
            size="small"
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

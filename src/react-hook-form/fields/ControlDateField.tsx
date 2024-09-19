import { ReactNode } from 'react';

import { getFieldHelperText } from '@cloudquery/cloud-ui';
import { TextFieldProps } from '@mui/material/TextField';
import { DateField, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Controller } from 'react-hook-form';

import { default as dayjs } from '../../utils/date';

/**
 * @public
 */
export interface ControlDateFieldProps {
  name: string;
  helperText?: ReactNode;
  label: ReactNode;
  disabled?: boolean;
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

function getDefaultDate(date?: string): dayjs.Dayjs | string {
  if (!date) {
    return '';
    // dayjs().subtract(1, 'month');
  }

  return dayjs(date);
}

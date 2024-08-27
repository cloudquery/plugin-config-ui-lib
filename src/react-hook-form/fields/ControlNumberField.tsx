import { Controller } from 'react-hook-form';
import { getFieldHelperText } from '@cloudquery/cloud-ui';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ReactNode } from 'react';

/**
 * @public
 */
export interface ControlNumberFieldProps {
  name: string;
  helperText?: ReactNode;
  label: ReactNode;
  textFieldProps?: TextFieldProps;
}

/**
 * This component is a react-hook-form wrapper around the MUI Textfield number component.
 *
 * @public
 */
export function ControlNumberField({
  name,
  label,
  helperText = '',
  textFieldProps = {},
}: ControlNumberFieldProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          error={!!fieldState.error}
          fullWidth={true}
          helperText={getFieldHelperText(fieldState.error?.message, helperText)}
          label={label}
          {...field}
          {...textFieldProps}
          type="number"
          onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
        />
      )}
    />
  );
}

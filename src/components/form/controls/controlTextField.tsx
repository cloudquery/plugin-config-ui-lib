import { ReactNode } from 'react';

import TextField, { TextFieldProps } from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

import { ControlSecretField } from './controlSecretField';
import { getFieldHelperText } from '../../../utils';

/**
 * @public
 */
export interface ControlTextFieldProps {
  name: string;
  helperText?: ReactNode;
  label: ReactNode;
  textFieldProps?: TextFieldProps;
}

/**
 * This component is a react-hook-form wrapper around the MUI Textfield component.
 *
 * @public
 */
export function ControlTextField({
  name,
  label,
  helperText = '',
  textFieldProps = {},
}: ControlTextFieldProps) {
  const { watch } = useFormContext();

  const secretKeys = watch('_secretKeys');
  const isSecret = secretKeys?.includes(name);

  if (isSecret) {
    return (
      <ControlSecretField
        name={name}
        label={label}
        helperText={helperText}
        textFieldProps={textFieldProps}
      />
    );
  }

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          error={!!fieldState.error}
          fullWidth={true}
          helperText={getFieldHelperText(fieldState.error?.message, helperText)}
          label={label}
          size="small"
          {...field}
          {...textFieldProps}
        />
      )}
    />
  );
}

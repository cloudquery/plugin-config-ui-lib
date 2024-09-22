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

  const ConcreteComponent = isSecret ? ControlSecretField : TextField;

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <ConcreteComponent
          error={!!fieldState.error}
          fullWidth={true}
          helperText={getFieldHelperText(fieldState.error?.message, helperText)}
          label={label}
          {...field}
          {...textFieldProps}
        />
      )}
    />
  );
}

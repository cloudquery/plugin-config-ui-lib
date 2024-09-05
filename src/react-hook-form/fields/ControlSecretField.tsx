import { ReactNode } from 'react';

import { getFieldHelperText } from '@cloudquery/cloud-ui';
import { TextFieldProps } from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';

import { SecretField } from '../../components';

/**
 * @public
 */
export interface ControlSecretFieldProps {
  name: string;
  helperText?: ReactNode;
  label: ReactNode;
  textFieldProps?: TextFieldProps;
}

/**
 * This component is a react-hook-form wrapper around the SecretField component.
 *
 * @public
 */
export function ControlSecretField({
  name,
  label,
  helperText = '',
  textFieldProps = {},
}: ControlSecretFieldProps) {
  const { watch, formState, getValues, setValue } = useFormContext();
  const editMode = watch('_editMode');

  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <SecretField
          editMode={editMode}
          label={label}
          defaultValues={formState.defaultValues}
          setValue={setValue}
          getValues={getValues}
          helperText={getFieldHelperText(fieldState.error?.message, helperText)}
          error={!!fieldState.error}
          {...field}
          {...textFieldProps}
        />
      )}
    />
  );
}

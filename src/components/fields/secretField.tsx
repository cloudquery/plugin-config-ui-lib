import { ChangeEventHandler, RefCallback, useState } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { getFieldHelperText } from '@cloudquery/cloud-ui';
import { FormFieldReset } from './formFieldReset';
import Stack from '@mui/material/Stack';
import { secretFieldValue } from '../../utils/constants';

const envPlaceholder = '************';

const getDefaultValue = (object: any, path: string) =>
  // eslint-disable-next-line unicorn/no-array-reduce
  path.split('.').reduce((a, b) => a[b], object);

/**
 * @public
 */
export interface SecretFieldProps {
  editMode: boolean;
  label: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onBlur?: () => void;
  value: any;
  defaultValues: any;
  disabled?: boolean;
  name: string;
  ref: RefCallback<HTMLInputElement>;
  textFieldProps?: TextFieldProps;
  setValue: (name: string, value: any) => void;
  getValues: (name?: string) => any;
  error?: boolean;
  helperText?: ReturnType<typeof getFieldHelperText>;
}

// TODO: This component can be simplified when react-hook-form is supported in the lib.
/**
 * SecretField component is a TextField wrapper to obfuscate sensitive values, while allowing value override.
 * It works well in conjunction with the utils: readSecretsFromInitialValues & writeSecretsToPrepareValues
 *
 * @public
 */
export function SecretField({
  name,
  label,
  disabled,
  value,
  onChange,
  onBlur,
  editMode,
  defaultValues,
  textFieldProps,
  setValue,
  getValues,
  error,
  helperText,
}: SecretFieldProps) {
  const [fieldResetted, setFieldResetted] = useState(false);

  const handleReset = () => {
    setFieldResetted(true);
    setValue(name as any, '');
  };

  const handelCancelReset = () => {
    setFieldResetted(false);
    setValue(name as any, secretFieldValue);
  };

  const isSecret = editMode && getDefaultValue(defaultValues, name) === secretFieldValue;
  const isObscured = isSecret && !fieldResetted && getValues(name as any) === secretFieldValue;

  return (
    <Stack direction="row" alignItems="flex-start" spacing={2}>
      <TextField
        error={!!error}
        fullWidth={true}
        helperText={helperText}
        label={label}
        autoComplete="off"
        required={true}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled || isObscured}
        value={isObscured ? envPlaceholder : value}
        {...textFieldProps}
      />
      {isSecret && (
        <FormFieldReset
          isResetted={fieldResetted || !isObscured}
          inputSelectorToFocus={`input[name="${name}"]`}
          onCancel={() => handelCancelReset()}
          onReset={() => handleReset()}
          sx={{ minHeight: 55 }}
        />
      )}
    </Stack>
  );
}
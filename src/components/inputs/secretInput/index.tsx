import React, { ChangeEventHandler, ReactNode, Ref, useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment } from '@mui/material';
import Stack from '@mui/material/Stack';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import { isOrHasSecret, obfuscateSecretDisplay } from '../../../utils/secretValueHandling';
import { FormFieldReset } from '../formFieldReset';

const getDefaultValue = (object: any, path: string) =>
  // eslint-disable-next-line unicorn/no-array-reduce
  path.split('.').reduce((a, b) => a[b], object);

/**
 * @public
 */
export interface SecretInputProps {
  editMode: boolean;
  label: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
  onBlur?: (e: any) => void;
  value: any;
  defaultValues: any;
  disabled?: boolean;
  name: string;
  ref: Ref<HTMLDivElement>;
  textFieldProps?: TextFieldProps;
  setValue: (name: string, value: any) => void;
  getValues: (name?: string) => any;
  error?: boolean;
  helperText?: ReactNode;
  disableVisibilityToggle?: boolean;
}

/**
 * SecretInput component is a TextField wrapper to obfuscate sensitive values, while allowing value override.
 *
 * @public
 */
export const SecretInput = React.forwardRef<HTMLDivElement, SecretInputProps>(
  (
    {
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
      disableVisibilityToggle,
    },
    ref,
  ) => {
    const [fieldResetted, setFieldResetted] = useState(false);
    const [showPlainText, setShowPlainText] = useState(false);
    const handleReset = () => {
      setFieldResetted(true);
      setValue(name as any, '');
    };

    const handelCancelReset = () => {
      setFieldResetted(false);
      setValue(name as any, getDefaultValue(defaultValues, name));
    };

    const isSecret = editMode && isOrHasSecret(getDefaultValue(defaultValues, name));
    const isObscured = isSecret && !fieldResetted && isOrHasSecret(getValues(name as any));
    const displayValue = isObscured ? obfuscateSecretDisplay(value) : value;

    return (
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: 'flex-start',
        }}
      >
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
          value={displayValue}
          {...textFieldProps}
          sx={{
            ...textFieldProps?.sx,
            input: {
              ...(textFieldProps?.sx as any)?.input,
              filter: showPlainText || !value ? undefined : 'blur(3px)',
            },
            textarea: {
              ...(textFieldProps?.sx as any)?.textarea,
              filter: showPlainText || !value ? undefined : 'blur(3px)',
            },
          }}
          ref={ref}
          name={name}
          size="small"
          slotProps={{
            input: {
              endAdornment: disableVisibilityToggle ? null : (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle visibility"
                    edge="end"
                    onClick={() => setShowPlainText(!showPlainText)}
                  >
                    {showPlainText ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
        {isSecret && (
          <FormFieldReset
            isResetted={fieldResetted || !isObscured}
            inputSelectorToFocus={`input[name="${name}"]`}
            onCancel={() => handelCancelReset()}
            onReset={() => handleReset()}
            sx={{ minHeight: 48 }}
          />
        )}
      </Stack>
    );
  },
);

SecretInput.displayName = 'SecretInput';

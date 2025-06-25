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

function checkWebkitTextSecuritySupported() {
  const input = document.createElement('input');
  input.style.display = 'none';
  document.body.append(input);
  const style = window.getComputedStyle(input);

  return !!(style as any).webkitTextSecurity;
}

const isWebkitTextSecuritySupported = checkWebkitTextSecuritySupported();

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
      setShowPlainText(false);
      setValue(name as any, '');
    };

    const handelCancelReset = () => {
      setFieldResetted(false);
      setShowPlainText(false);
      setValue(name as any, getDefaultValue(defaultValues, name));
    };

    const isSecret = editMode && isOrHasSecret(getDefaultValue(defaultValues, name));
    const isObscured = isSecret && !fieldResetted && isOrHasSecret(getValues(name as any));
    const displayValue = isObscured ? obfuscateSecretDisplay(value) : value;
    const isBlurred = !showPlainText && !!value && !isObscured;

    // The goal is to use webkitTextSecurity only if the browser supports it or if the field is multiline.
    // If the browser does not support webkitTextSecurity, we will use the password type.
    const useWebkitTextSecurity = isWebkitTextSecuritySupported || textFieldProps?.multiline;

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
          autoComplete={useWebkitTextSecurity ? 'off' : 'one-time-code'}
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
              WebkitTextSecurity: useWebkitTextSecurity && isBlurred ? 'disc' : undefined,
            },
            textarea: {
              ...(textFieldProps?.sx as any)?.textarea,
              WebkitTextSecurity: useWebkitTextSecurity && isBlurred ? 'disc' : undefined,
            },
          }}
          ref={ref}
          name={name}
          size="small"
          slotProps={{
            input: {
              endAdornment:
                !disableVisibilityToggle && !isObscured ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle visibility"
                      edge="end"
                      onClick={() => setShowPlainText(!showPlainText)}
                    >
                      {showPlainText ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ) : null,
            },
          }}
          type={
            !useWebkitTextSecurity && isBlurred && !textFieldProps?.multiline ? 'password' : 'text'
          }
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

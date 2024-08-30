import { Controller, useFormContext } from 'react-hook-form';
import { getFieldHelperText } from '@cloudquery/cloud-ui';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { ReactNode } from 'react';
import { ControlSecretField } from './ControlSecretField';

/**
 * @public
 */
export interface ControlTextFieldProps extends Pick<ShouldRenderProps, 'shouldRender'> {
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
  shouldRender,
}: ControlTextFieldProps) {
  const { watch } = useFormContext();

  const secretKeys = watch('_secretKeys');
  const isSecret = secretKeys?.includes(name);

  const ConcreteComponent = isSecret ? ControlSecretField : TextField;

  return (
    <ShouldRenderWrapper shouldRender={shouldRender}>
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
    </ShouldRenderWrapper>
  );
}

interface ShouldRenderProps {
  shouldRender?: (values: Record<string, any>) => boolean;
  children: ReactNode;
}

function ShouldRenderWrapper({ shouldRender, children }: ShouldRenderProps) {
  const { watch } = useFormContext();
  const willRender = shouldRender ? shouldRender(watch()) : true;

  return willRender ? children : null;
}

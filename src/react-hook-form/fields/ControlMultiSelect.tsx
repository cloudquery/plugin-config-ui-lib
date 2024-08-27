import { getFieldHelperText } from '@cloudquery/cloud-ui';
import { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { MultiAutocomplete } from '../../components';

export interface ControlMultiSelectProps {
  name: string;
  label: string;
  helperText?: string;
}

/**
 * This component is a react-hook-form wrapper around the MUI Autocomplete multi-select component.
 *
 * @public
 */
export function ControlMultiSelect({ name, helperText = '', label }: ControlMultiSelectProps) {
  const { trigger, formState } = useFormContext();

  const errors = useMemo(() => {
    if (formState.errors?.[name]) {
      return formState.errors?.[name]?.message;
    } else {
      const arrayErrorKey = Object.keys(formState.errors).find((key) => key.includes(name));
      if (arrayErrorKey) {
        return formState.errors[arrayErrorKey]?.message ?? '';
      }
    }

    return '';
  }, [formState.errors]);

  return (
    <Controller
      name={name}
      render={({ field }) => {
        const { onChange, value, ...fieldProps } = field;

        return (
          <MultiAutocomplete
            value={value}
            onChange={(newValue) => {
              onChange(newValue);
              trigger();
            }}
            {...fieldProps}
            error={!!errors}
            helperText={getFieldHelperText(errors as string, helperText)}
            label={label}
          />
        );
      }}
    />
  );
}

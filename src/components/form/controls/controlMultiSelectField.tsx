import { ReactNode, useMemo } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { getFieldHelperText } from '../../../utils';
import { MultiAutocomplete } from '../../inputs/multiAutocomplete';

/**
 * @public
 */
export interface ControlMultiSelectFieldProps {
  name: string;
  label: string;
  helperText?: ReactNode;
  codeSeparators?: string[];
}

/**
 * This component is a react-hook-form wrapper around the MUI Autocomplete multi-select component.
 *
 * @public
 */
export function ControlMultiSelectField({
  name,
  helperText = '',
  label,
  codeSeparators,
}: ControlMultiSelectFieldProps) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              trigger(name);
            }}
            {...fieldProps}
            error={!!errors}
            helperText={getFieldHelperText(errors as string, helperText)}
            label={label}
            codeSeparators={codeSeparators}
          />
        );
      }}
    />
  );
}

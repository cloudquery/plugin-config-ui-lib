import React from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { getFieldHelperText } from '../../utils/getFieldHelperText';

/**
 * @public
 */
export interface MultiAutocompleteProps {
  value: any;
  onChange: (value: any) => void;
  onBlur: () => void;
  disabled?: boolean | undefined;
  name: string;
  error?: boolean;
  helperText?: ReturnType<typeof getFieldHelperText>;
  label: string;
  codeSeparators?: string[];
}

/**
 * MultiAutocomplete component is a multi value, free entry component.
 *
 * @public
 */
export const MultiAutocomplete = React.forwardRef<HTMLDivElement, MultiAutocompleteProps>(
  (
    {
      label,
      disabled,
      value,
      onChange,
      onBlur,
      name,
      helperText,
      error,
      codeSeparators = ['Space'],
    },
    ref,
  ) => {
    const fieldProps = { onBlur, name, ref, disabled };

    return (
      <Autocomplete
        id={`autocomplete-${name}`}
        multiple={true}
        freeSolo={true}
        autoSelect={true}
        clearOnBlur={true}
        disabled={disabled}
        options={[]}
        getOptionLabel={(option) => option}
        value={value}
        onChange={(_, newValue) => {
          onChange(newValue);
        }}
        onKeyDown={(event) => {
          const target = event.target as HTMLInputElement;
          const shouldSubmit =
            codeSeparators.includes(event.code) && target?.value?.trim().length > 0;

          if (shouldSubmit) {
            event.preventDefault();
            event.stopPropagation();
            target.blur();
            target.focus();
          }
        }}
        filterSelectedOptions={true}
        renderInput={(params) => (
          <TextField
            {...params}
            {...fieldProps}
            error={!!error}
            fullWidth={true}
            helperText={helperText}
            label={label}
          />
        )}
      />
    );
  },
);

MultiAutocomplete.displayName = 'MultiAutocomplete';

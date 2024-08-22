import { RefCallback } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getFieldHelperText } from '@cloudquery/cloud-ui';

/**
 * @public
 */
export interface MultiAutocompleteProps {
  value: any;
  onChange: (value: any) => void;
  onBlur: () => void;
  disabled?: boolean | undefined;
  name: string;
  ref: RefCallback<HTMLInputElement>;
  error?: boolean;
  helperText?: ReturnType<typeof getFieldHelperText>;
  label: string;
}

// TODO: This component can be simplified when react-hook-form is supported in the lib.
/**
 * MultiAutocomplete component is a multi value, free entry component.
 *
 * @public
 */
export function MultiAutocomplete({
  label,
  disabled,
  value,
  onChange,
  onBlur,
  name,
  ref,
  helperText,
  error,
}: MultiAutocompleteProps) {
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
        const shouldSubmit = event.code === 'Space' && target?.value?.trim().length > 0;

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
}

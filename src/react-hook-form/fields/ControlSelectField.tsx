import { ReactNode } from 'react';

import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';

import { getFieldHelperText } from '../../utils/getFieldHelperText';

type OptionObject = {
  value: any;
  label: string;
};

/**
 * @public
 */
export interface ControlSelectFieldProps {
  name: string;
  label: string;
  helperText?: ReactNode;
  options: (string | OptionObject)[];
}

/**
 * This component is a react-hook-form wrapper around the MUI Textfield implementation of a select component.
 *
 * @public
 */
export function ControlSelectField({
  name,
  helperText = '',
  label,
  options,
}: ControlSelectFieldProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          error={!!fieldState.error}
          fullWidth={true}
          helperText={getFieldHelperText(fieldState.error?.message, helperText)}
          label={label}
          select={true}
          {...field}
          slotProps={{
            select: {
              MenuProps: {
                autoFocus: false,
                disableAutoFocus: true,
              },
            },
          }}
        >
          {options.map((option) => {
            if (typeof option === 'string') {
              return (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              );
            } else {
              const menuOption = option as OptionObject;

              return (
                <MenuItem key={menuOption.value} value={menuOption.value}>
                  {menuOption.label}
                </MenuItem>
              );
            }
          })}
        </TextField>
      )}
    />
  );
}

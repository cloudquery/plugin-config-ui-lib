import { ReactNode } from 'react';

import { FormControl, FormHelperText, FormLabel } from '@mui/material';
import { Controller } from 'react-hook-form';

import { ServiceList, ServiceTypes } from '../../components/display/serviceList';
import { getFieldHelperText } from '../../utils/getFieldHelperText';

/**
 * @public
 */
export interface ControlServicesSelectorProps {
  services: ServiceTypes;
  topServices?: string[];
  name: string;
  helperText?: ReactNode;
  label?: string;
}

/**
 * This component is a react-hook-form wrapper around the Select Services component.
 * Usage of this component is uncommon, the Table Selector is a more common choice.
 *
 * @public
 */
export function ControlServicesSelector({
  services,
  topServices,
  name,
  helperText,
  label,
}: ControlServicesSelectorProps) {
  return (
    <Controller
      name={name}
      render={({ field, fieldState }) => (
        <FormControl>
          <FormLabel>{label}</FormLabel>
          <ServiceList
            topServices={topServices}
            services={services}
            value={field.value}
            onChange={field.onChange}
            maxHeight="none"
          />
          <FormHelperText error={!!fieldState.error?.message}>
            {getFieldHelperText(fieldState.error?.message, helperText)}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}

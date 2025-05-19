import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import { Controller } from 'react-hook-form';

import { usePluginContext } from '../../../context';
import { ServiceList } from '../../display';

/**
 * @public
 */
export interface ControlServicesSelectorFieldProps {
  topServices: string[];
}

/**
 * This component is a react-hook-form wrapper around the Select Services component.
 * Usage of this component is uncommon, the Table Selector is a more common choice.
 *
 * @public
 */
export function ControlServicesSelectorField({ topServices }: ControlServicesSelectorFieldProps) {
  const { config, servicesList } = usePluginContext();

  return (
    <Controller
      name="tables"
      render={({ field, fieldState }) => (
        <FormControl>
          <ServiceList
            topServices={topServices}
            services={servicesList || []}
            value={field.value}
            onChange={field.onChange}
            maxHeight="none"
            fallbackLogoSrc={config.iconLink}
          />
          <FormHelperText error={!!fieldState.error?.message}>
            {fieldState.error?.message}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
}

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
  slowTables: string[];
}

/**
 * This component is a react-hook-form wrapper around the Select Services component.
 * Usage of this component is uncommon, the Table Selector is a more common choice.
 *
 * @public
 */
export function ControlServicesSelectorField({
  topServices,
  slowTables,
}: ControlServicesSelectorFieldProps) {
  const { config, servicesList, initialValues } = usePluginContext();

  return (
    <Controller
      name="tables"
      render={({ field, fieldState }) => (
        <FormControl>
          <input
            type="text"
            style={{
              maxWidth: 0,
              overflow: 'hidden',
              padding: 0,
              margin: 0,
              maxHeight: 0,
              border: 0,
            }}
            onChange={() => null}
            name="tables"
            value={JSON.stringify(field.value)}
          />
          <ServiceList
            topServices={topServices}
            services={servicesList || []}
            value={field.value}
            onChange={field.onChange}
            maxHeight="none"
            fallbackLogoSrc={config.iconLink}
            isUpdating={!!initialValues}
            slowTables={slowTables}
          />
          {!!fieldState.error?.message && (
            <FormHelperText error={!!fieldState.error?.message} sx={{ mt: 2 }}>
              {fieldState.error?.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import { Controller, useFormContext } from 'react-hook-form';

import { usePluginContext } from '../../../context';
import { ServiceSelector } from '../../inputs/serviceSelector';

/**
 * @public
 */
export interface ControlServicesSelectorFieldProps {
  topServices: string[];
  slowTables: string[];
  expensiveTables: string[];
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
  expensiveTables,
}: ControlServicesSelectorFieldProps) {
  const { config, servicesList, initialValues } = usePluginContext();
  const { watch } = useFormContext();
  const currentStepSubmitted = watch('_currentStepSubmitted');

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
          <ServiceSelector
            topServices={topServices}
            services={servicesList || []}
            value={field.value}
            onChange={field.onChange}
            maxHeight="none"
            fallbackLogoSrc={config.iconLink}
            isUpdating={!!initialValues}
            slowTables={slowTables}
            expensiveTables={expensiveTables}
          />
          {!!fieldState.error?.message && currentStepSubmitted && (
            <FormHelperText error={!!fieldState.error?.message} sx={{ mt: 2 }}>
              {fieldState.error?.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}

import { useMemo } from 'react';

import { FormMessagePayload } from '@cloudquery/plugin-config-ui-connector';
import * as yup from 'yup';

import { usePluginContext } from '../context/plugin';
import { PluginConfigFormStep } from '../types';
import { getCoreSchema } from '../utils/getCoreSchema';
import { resetYupDefaultErrorMessages } from '../utils/getYupValidationResolver';

/**
 * @public
 */
export interface UseCoreFormSchemaProps {
  initialValues: FormMessagePayload['init']['initialValues'];
  fields: Record<string, yup.AnySchema>;
  secretFields?: Record<string, yup.AnySchema>;
  stateFields?: Record<string, yup.AnySchema>;
}

/**
 * Custom hook to handle form schema instantiation.
 *
 * @public
 */
export const useCoreFormSchema = ({
  initialValues,
  fields,
  secretFields = {},
  stateFields = {},
}: UseCoreFormSchemaProps) => {
  resetYupDefaultErrorMessages(yup);
  const { tablesList, config, servicesList } = usePluginContext();

  const tablesOrServicesStep = useMemo(
    () => config.steps.findIndex((step) => findTablesOrServicesStep(step.children)),
    [config.steps],
  );

  const coreSchema = useMemo(
    () => getCoreSchema({ initialValues, tablesList, config, servicesList, tablesOrServicesStep }),
    [initialValues, tablesList, config, servicesList, tablesOrServicesStep],
  );

  return useMemo(
    () =>
      yup.object({
        ...coreSchema,
        ...stateFields,
        ...fields,
        ...secretFields,
        _secretKeys: yup.array().default(Object.keys(secretFields)),
      }),
    [coreSchema, stateFields, fields, secretFields],
  );
};

function findTablesOrServicesStep(children: PluginConfigFormStep['children']): boolean {
  return children.some(
    (child) =>
      typeof child !== 'function' &&
      (['control-services-selector', 'control-table-selector'].includes(
        child.component as string,
      ) ||
        ('children' in child && findTablesOrServicesStep(child.children as any))),
  );
}

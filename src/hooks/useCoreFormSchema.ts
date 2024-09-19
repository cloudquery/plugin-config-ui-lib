import { useMemo } from 'react';

import { FormMessagePayload } from '@cloudquery/plugin-config-ui-connector';
import * as yup from 'yup';

import { usePluginContext } from '../context/plugin';
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
  const { tablesList, config } = usePluginContext();

  const coreSchema = useMemo(
    () => getCoreSchema({ initialValues, tablesList, config }),
    [initialValues, tablesList, config],
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

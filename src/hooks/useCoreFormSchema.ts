import { resetYupDefaultErrorMessages } from '@cloudquery/cloud-ui';
import { FormMessagePayload } from '@cloudquery/plugin-config-ui-connector';
import * as yup from 'yup';
import { getCoreSchema } from '../utils/getCoreSchema';
import { PluginContext } from '../context/plugin';
import { useContext } from 'react';

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
  const { tablesList, config } = useContext(PluginContext);

  return yup.object({
    ...getCoreSchema({ initialValues, tablesList, config }),
    ...stateFields,
    ...fields,
    ...secretFields,
    _secretKeys: yup.array().default(Object.keys(secretFields)),
  });
};

import { resetYupDefaultErrorMessages } from '@cloudquery/cloud-ui';
import { FormMessagePayload } from '@cloudquery/plugin-config-ui-connector';
import * as yup from 'yup';
import { getCoreSchema } from '../utils/getCoreSchema';
import { usePluginContext } from '../context/plugin';

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

  return yup.object({
    ...getCoreSchema({ initialValues, tablesList, config }),
    ...stateFields,
    ...fields,
    ...secretFields,
    _secretKeys: yup.array().default(Object.keys(secretFields)),
  });
};

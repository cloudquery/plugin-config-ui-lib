import { resetYupDefaultErrorMessages } from '@cloudquery/cloud-ui';
import { FormMessagePayload } from '@cloudquery/plugin-config-ui-connector';
import * as yup from 'yup';
import { CloudQueryTables } from '../utils/generateTablesFromJson';
import { getCoreSchema } from '../utils/getCoreSchema';
import { PluginConfig } from '../types';

interface Props {
  config: PluginConfig;
  initialValues: FormMessagePayload['init']['initialValues'];
  plugin: any;
  teamName: any;
  fields: Record<string, yup.AnySchema>;
  secretFields: Record<string, yup.AnySchema>;
  tablesData: CloudQueryTables;
}

/**
 * Custom hook to handle form schema instantiation.
 *
 * @public
 */
export const useCoreFormSchema = ({
  config,
  initialValues,
  plugin,
  teamName,
  fields,
  secretFields,
  tablesData,
}: Props) => {
  resetYupDefaultErrorMessages(yup);

  return yup.object({
    ...getCoreSchema({ config, initialValues, plugin, teamName, tablesData }),
    ...fields,
    ...secretFields,
    _secretKeys: yup.array().default(Object.keys(secretFields)),
  });
};

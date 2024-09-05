import { FormMessagePayload } from '@cloudquery/plugin-config-ui-connector';
import * as yup from 'yup';

import { generateDisplayName } from './generateDisplayName';
import { generateUniqueName } from './generateUniqueName';
import { getEnabledTablesObject } from './getEnabledTablesObject';
import { PluginTable } from '../components';
import { AuthType, PluginConfig } from '../types';

interface Props {
  config: PluginConfig;
  initialValues: FormMessagePayload['init']['initialValues'];
  tablesList?: PluginTable[];
}

export const getCoreSchema = ({ initialValues, tablesList, config }: Props) => {
  const coreFieldProps: Record<string, yup.AnySchema> = {
    name: yup.string().default(initialValues?.name ?? generateUniqueName(config.name)),
    displayName: yup
      .string()
      .default(initialValues?.displayName ?? generateDisplayName(config.label))
      .matches(
        /^[A-Za-z][\w '\-]*$/,
        'Name must start with a letter and cannot include special characters.',
      )
      .max(255)
      .required(),
    connectorId: yup
      .string()
      .default(initialValues?.connectorId ?? '')
      .when('_authType', {
        is: (authType: AuthType) => authType === AuthType.OAUTH,
        // eslint-disable-next-line unicorn/no-thenable
        then: (schema: any) => schema.trim().required(),
      }),
  };

  if (tablesList) {
    coreFieldProps.tables = yup
      .object()
      .default(getEnabledTablesObject({ tablesList, tables: initialValues?.tables }));
  }

  const formStateProps = {
    _editMode: yup.boolean().default(!!initialValues?.name),
    _authType: yup
      .mixed()
      .oneOf(Object.values(AuthType))
      .default(config.auth[0] ?? AuthType.OTHER),
    _step: yup.number().default(0),
  };

  return {
    ...coreFieldProps,
    ...formStateProps,
  };
};

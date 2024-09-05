import * as yup from 'yup';
import { AuthType, PluginConfig } from '../types';
import { FormMessagePayload } from '@cloudquery/plugin-config-ui-connector';
import { PluginTable } from '../components';
import { getEnabledTablesObject } from './getEnabledTablesObject';
import { generateDisplayName } from './generateDisplayName';
import { generateUniqueName } from './generateUniqueName';

interface Props {
  config: PluginConfig;
  initialValues: FormMessagePayload['init']['initialValues'];
  tablesList?: PluginTable[];
}

export const getCoreSchema = ({ initialValues, tablesList, config }: Props) => {
  const coreFieldProps = {
    name: yup.string().default(initialValues?.name ?? generateUniqueName(config.name)),
    displayName: yup
      .string()
      .default(initialValues?.displayName ?? generateDisplayName(config.label))
      .matches(
        /^[a-zA-Z][a-zA-Z0-9_ \-']*$/,
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
    ...(tablesList && {
      tables: yup
        .object()
        .default(getEnabledTablesObject({ tablesList, tables: initialValues?.tables })),
    }),
  };

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

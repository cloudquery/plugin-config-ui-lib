import { FormMessagePayload } from '@cloudquery/plugin-config-ui-connector';
import * as yup from 'yup';

import { generateDisplayName } from './generateDisplayName';
import { generateUniqueName } from './generateUniqueName';
import { getEnabledTablesObject } from './getEnabledTablesObject';
import { PluginTable, Service } from '../components';
import { AuthType, PluginConfig } from '../types';

interface Props {
  config: PluginConfig;
  initialValues: FormMessagePayload['init']['initialValues'];
  tablesList?: PluginTable[];
  servicesList?: Service[];
}

export const getCoreSchema = ({ initialValues, tablesList, config, servicesList }: Props) => {
  const coreFieldProps = {
    name: yup.string().default(initialValues?.name ?? generateUniqueName(config.name)),
    displayName: yup
      .string()
      .default(initialValues?.displayName ?? generateDisplayName(config.label))
      .matches(
        /^[A-Za-z][\w '-]*$/,
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
        .default(getEnabledTablesObject({ tablesList, tables: initialValues?.tables }))
        .test({
          name: 'has-tables',
          message: 'At least one table must be selected',
          test: (value: Record<string, boolean>, context: any) =>
            context.parent._step < config.steps.length - 1 || Object.values(value).some(Boolean),
        }),
      ...(servicesList && {
        tables: yup
          .object()
          .default(
            getEnabledTablesObject({
              tablesList: [...new Set(servicesList.flatMap((service) => service.tables))].map(
                (table) => ({
                  name: table,
                  description: '',
                  is_incremental: false,
                  relations: [],
                  title: table,
                }),
              ),
              tables: initialValues?.tables,
            }),
          )
          .test({
            name: 'has-services',
            message: 'At least one service must be selected',
            test: (value: Record<string, boolean>, context: any) =>
              context.parent._step < config.steps.length - 1 || Object.values(value).some(Boolean),
          }),
      }),
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

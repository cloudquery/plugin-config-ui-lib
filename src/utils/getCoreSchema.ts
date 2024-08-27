import * as yup from 'yup';
import { AuthType, PluginConfig } from '../types';
import { FormMessagePayload } from '@cloudquery/plugin-config-ui-connector';
import { generateTablesFromJson } from '.';
import { PluginTable } from '../components';
import { generateName } from './generateName';
import { CloudQueryTables } from './generateTablesFromJson';

interface Props {
  config: PluginConfig;
  initialValues: FormMessagePayload['init']['initialValues'];
  plugin: any;
  teamName: any;
  tablesData: CloudQueryTables;
}

export const getCoreSchema = ({ config, initialValues, plugin, teamName, tablesData }: Props) => {
  const tablesList = generateTablesFromJson(tablesData as CloudQueryTables);

  const coreFieldProps = {
    name: yup
      .string()
      .default(generateName(config.name))
      .matches(
        /^[a-z](-?[\da-z]+)+$/,
        'Name must consist of a lower case letter, followed by alphanumeric segments separated by single dashes',
      )
      .max(255)
      .required(),
    tables: yup
      .mixed()
      .default(initialValues ? getEnabledTablesObject(tablesList, initialValues.tables) : {})
      .test({
        name: 'has-tables',
        message: 'At least one table must be selected',
        test: (value: Record<string, boolean>, context) =>
          context.parent._step === 0 || Object.values(value).some(Boolean),
      }),
    connectorId: yup
      .string()
      .default('')
      .when('_authType', {
        is: (authType: AuthType) => authType === AuthType.OAUTH,
        // eslint-disable-next-line unicorn/no-thenable
        then: (schema: any) => schema.trim().required(),
      }),
  };

  const statefulProps = {
    _editMode: yup.boolean().default(!!initialValues?.name),
    _authType: yup.number().oneOf(Object.values(config.auth)).default(config.auth[0]),
    _step: yup.number().default(0),
    _plugin: yup.object({
      team: yup.string().default(plugin?.team ?? 'cloudquery'),
      name: yup.string().default(config.name),
      version: yup.string().default(plugin?.version ?? 'development'),
      kind: yup.string().default(config.type),
    }),
    _teamName: yup.string().default(teamName ?? ''),
    _data: yup.object({
      tablesList: yup
        .array()
        .of(yup.object())
        .default(tablesList ?? []),
    }),
  };

  return {
    ...coreFieldProps,
    ...statefulProps,
  };
};

const getEnabledTablesObject = (
  tablesList: PluginTable[],
  tables: string[] = [],
): Record<string, boolean> => {
  console.log({ tablesList, tables });
  const enabledTablesObject: Record<string, boolean> = {};

  if (tables.length === 1 && tables[0] === '*') {
    for (const table of tablesList) {
      enabledTablesObject[table.name] = true;
    }

    return enabledTablesObject;
  } else {
    for (const table of tables) {
      if (table !== '*') {
        enabledTablesObject[table] = true;
      }
    }
  }
  console.log({ enabledTablesObject });

  return enabledTablesObject;
};

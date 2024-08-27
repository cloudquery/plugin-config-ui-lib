import { PluginUiMessagePayload } from '@cloudquery/plugin-config-ui-connector';
import { writeSecretsToPrepareValues } from './processEnvSecrets';
import { PluginTable } from '../components';

/**
 * Prepare values for submit
 *
 * @public
 */
export function corePrepareSubmitValues(
  values: any,
): PluginUiMessagePayload['validation_passed']['values'] {
  const base = {
    name: values.name,
    tables: getEnabledTablesArray(values.tables, values._data.tablesList as PluginTable[]),
    spec: {} as Record<string, any>,
  };

  const secrets = writeSecretsToPrepareValues(values);

  return {
    ...base,
    envs: secrets.envs,
    spec: {
      ...base.spec,
      ...secrets.spec,
    },
  };
}

const getEnabledTablesArray = (
  tables: Record<string, boolean>,
  tablesList: PluginTable[],
): string[] => {
  const enabledTables = Object.entries(tables)
    .filter(([, isEnabled]) => !!isEnabled)
    .map(([tableName]) => tableName);

  return enabledTables.length === tablesList.length ? ['*'] : enabledTables;
};

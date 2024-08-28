import { PluginUiMessagePayload } from '@cloudquery/plugin-config-ui-connector';
import { PluginTable } from '../components';
import { prepareSecretValues } from './prepareSecretValues';

/**
 * Prepare values for submit
 *
 * @public
 */
export function corePrepareSubmitValues(
  values: any,
  tablesList?: PluginTable[],
): PluginUiMessagePayload['validation_passed']['values'] {
  const base = {
    name: values.name,
    tables: tablesList ? getEnabledTablesArray(values.tables, tablesList) : undefined,
    spec: {} as Record<string, any>,
  };

  const secrets = prepareSecretValues(values);

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

import { PluginUiMessagePayload } from '@cloudquery/plugin-config-ui-connector';

import { prepareOAuthValue } from './prepareOAuthValue';
import { prepareSecretValues } from './prepareSecretValues';
import { PluginTable, Service } from '../components';
import { PluginConfig } from '../types';

/**
 * Prepare values for submit
 *
 * @public
 */
export function corePrepareSubmitValues({
  config,
  values,
  tablesList,
  servicesList,
}: {
  config: PluginConfig;
  values: any;
  tablesList?: PluginTable[];
  servicesList?: Service[];
}): PluginUiMessagePayload['validation_passed']['values'] {
  const base = {
    name: values.name,
    displayName: values.displayName,
    tables: tablesList || servicesList ? getEnabledTablesArray(values.tables) : undefined,
    spec: {} as Record<string, any>,
  };

  const secrets = prepareSecretValues(config.steps, values);
  const oauthValue = prepareOAuthValue(values);

  return {
    ...base,
    ...oauthValue,
    envs: secrets.envs,
    spec: {
      ...base.spec,
      ...secrets.spec,
    },
  };
}

const getEnabledTablesArray = (tables: Record<string, boolean>): string[] => {
  return Object.entries(tables)
    .filter(([, isEnabled]) => !!isEnabled)
    .map(([tableName]) => tableName);
};

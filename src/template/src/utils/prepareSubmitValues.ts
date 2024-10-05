import { PluginUiMessagePayload } from '@cloudquery/plugin-config-ui-connector';

import {
  corePrepareSubmitValues,
  PluginConfig,
  PluginTable,
} from '@cloudquery/plugin-config-ui-lib';

export function prepareSubmitValues(
  config: PluginConfig,
  values: Record<string, any>,
  tablesList?: PluginTable[],
): PluginUiMessagePayload['validation_passed']['values'] {
  const payload = corePrepareSubmitValues(config, values, tablesList);

  return payload;
}

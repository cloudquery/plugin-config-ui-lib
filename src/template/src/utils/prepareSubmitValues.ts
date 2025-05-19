import { PluginUiMessagePayload } from '@cloudquery/plugin-config-ui-connector';

import {
  corePrepareSubmitValues,
  PluginConfig,
  PluginTable,
  Service,
} from '@cloudquery/plugin-config-ui-lib';

export function prepareSubmitValues({
  config,
  values,
  tablesList,
  servicesList,
}: {
  config: PluginConfig;
  values: Record<string, any>;
  tablesList?: PluginTable[];
  servicesList?: Service[];
}): PluginUiMessagePayload['validation_passed']['values'] {
  const payload = corePrepareSubmitValues({
    config, values, tablesList, servicesList
  });

  return payload;
}

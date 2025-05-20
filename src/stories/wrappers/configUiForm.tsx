import { FormMessagePayload } from '@cloudquery/plugin-config-ui-connector';

import { ConfigUIForm, Service } from '../../components';
import { PluginContextProvider } from '../../context';
import { CloudQueryTables } from '../../utils';

export const ConfigUIFormWrapper = ({
  config,
  getServicesData,
  getTablesData,
  initialValues,
}: {
  config: any;
  getServicesData?: () => Promise<{ default: Service[] }>;
  getTablesData?: () => Promise<{ default: CloudQueryTables }>;
  initialValues?: FormMessagePayload['init']['initialValues'];
}) => {
  const pluginUiMessageHandler = {
    sendMessage: () => {},
    subscribeToMessage: () => {},
    subscribeToMessageOnce: () => {},
  };

  return (
    <PluginContextProvider
      config={config}
      teamName="cq-test"
      getServicesData={getServicesData}
      getTablesData={getTablesData}
      hideStepper={true}
      pluginUiMessageHandler={pluginUiMessageHandler}
      initialValues={initialValues}
    >
      <ConfigUIForm prepareSubmitValues={(() => {}) as any} />
    </PluginContextProvider>
  );
};

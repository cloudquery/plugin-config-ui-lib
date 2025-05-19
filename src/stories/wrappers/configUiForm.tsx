import { ConfigUIForm, Service } from '../../components';
import { PluginContextProvider } from '../../context';
import { CloudQueryTables } from '../../utils';

export const ConfigUIFormWrapper = ({
  config,
  getServicesData,
  getTablesData,
}: {
  config: any;
  getServicesData?: () => Promise<{ default: Service[] }>;
  getTablesData?: () => Promise<{ default: CloudQueryTables }>;
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
      initialValues={undefined}
    >
      <ConfigUIForm prepareSubmitValues={(() => {}) as any} />
    </PluginContextProvider>
  );
};

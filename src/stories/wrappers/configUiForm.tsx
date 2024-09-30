import { ConfigUIForm } from '../../components';
import { PluginContextProvider } from '../../context';
import tablesData from '../mocks/tables.js';

export const ConfigUIFormWrapper = ({ config }) => {
  const pluginUiMessageHandler = {
    sendMessage: () => {},
    subscribeToMessage: () => {},
    subscribeToMessageOnce: () => {},
  };

  return (
    <PluginContextProvider
      config={config}
      teamName="cq-test"
      getTablesData={async () => tablesData}
      hideStepper={true}
      pluginUiMessageHandler={pluginUiMessageHandler}
      initialValues={{} as any}
    >
      <ConfigUIForm prepareSubmitValues={(() => {}) as any} />
    </PluginContextProvider>
  );
};

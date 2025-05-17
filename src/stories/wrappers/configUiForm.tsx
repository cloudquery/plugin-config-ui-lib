import { ConfigUIForm } from '../../components';
import { PluginContextProvider } from '../../context';
import tablesData from '../mocks/tables.js';

export const ConfigUIFormWrapper = ({ config }: { config: any }) => {
  const pluginUiMessageHandler = {
    sendMessage: () => {},
    subscribeToMessage: () => {},
    subscribeToMessageOnce: () => {},
  };

  return (
    <PluginContextProvider
      config={config}
      teamName="cq-test"
      getTablesData={async () => ({ default: tablesData })}
      hideStepper={true}
      pluginUiMessageHandler={pluginUiMessageHandler}
      initialValues={undefined}
    >
      <ConfigUIForm prepareSubmitValues={(() => {}) as any} />
    </PluginContextProvider>
  );
};

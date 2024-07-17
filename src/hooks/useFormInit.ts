import { useEffect, useState } from 'react';

import { FormMessagePayload, PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';

/**
 * This hook is used to initialize the plugin UI form.
 * It subscribes to the `init` message to get initial values
 * and sends a `ready` message to the CloudQuery Cloud App
 * with information whether to hide the submit button from the beginning.
 *
 * @public
 */
export function useFormInit(
  pluginUiMessageHandler: PluginUiMessageHandler,
  implementsCustomFooter: boolean,
): {
  initialized: boolean;
  initialValues: FormMessagePayload['init']['initialValues'] | undefined;
} {
  const [initialized, setInitialized] = useState(false);
  const [initialValues, setInitialValues] = useState<
    FormMessagePayload['init']['initialValues'] | undefined
  >();
  useEffect(() => {
    return pluginUiMessageHandler.subscribeToMessageOnce('init', ({ initialValues }) => {
      if (initialValues) {
        setInitialValues(initialValues);
      }

      setInitialized(true);

      pluginUiMessageHandler.sendMessage('ready', {
        implementsCustomFooter,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { initialized, initialValues };
}

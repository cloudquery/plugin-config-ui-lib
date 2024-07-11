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
  hideSubmitButton: boolean,
): {
  initialized: boolean;
  initialValues: FormMessagePayload['init']['initialValues'] | undefined;
  apiAuthorizationToken: string;
} {
  const [initialized, setInitialized] = useState(false);
  const [apiAuthorizationToken, setApiAuthorizationToken] = useState('');
  const [initialValues, setInitialValues] = useState<
    FormMessagePayload['init']['initialValues'] | undefined
  >();

  useEffect(() => {
    return pluginUiMessageHandler.subscribeToMessageOnce(
      'init',
      ({ initialValues, apiAuthorizationToken }) => {
        if (initialValues?.spec?.connection_string) {
          setInitialValues(initialValues);
        }

        setInitialized(true);
        setApiAuthorizationToken(apiAuthorizationToken);

        pluginUiMessageHandler.sendMessage('ready', {
          hideSubmitButton,
        });

        pluginUiMessageHandler.subscribeToMessage(
          'api_authorization_token_changed',
          ({ token }) => {
            setApiAuthorizationToken(token);
          },
        );
      },
    );
  }, []);

  return { initialized, initialValues, apiAuthorizationToken };
}

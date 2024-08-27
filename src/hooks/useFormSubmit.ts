import { useEffect, useState } from 'react';

import {
  PluginUiMessageHandler,
  PluginUiMessagePayload,
} from '@cloudquery/plugin-config-ui-connector';

/**
 * @public
 */
export interface FormSubmitSuccess {
  values: PluginUiMessagePayload['validation_passed']['values'];
  errors?: never;
}

/**
 * @public
 */
export interface FormSubmitFailure {
  values?: never;
  errors: PluginUiMessagePayload['validation_failed']['errors'];
}

/**
 * This hook is used to handle form submit in the plugin UI.
 * It requires a function that should validate the form and return
 * either a success object with values or a failure object with errors.
 *
 * @public
 */
export function useFormSubmit(
  onValidate: () =>
    | Promise<FormSubmitSuccess | FormSubmitFailure>
    | FormSubmitSuccess
    | FormSubmitFailure,
  pluginUiMessageHandler: PluginUiMessageHandler,
): { formDisabled: boolean; submitError: any | undefined } {
  const [submitError, setSubmitError] = useState<any | undefined>();
  const [formDisabled, setFormDisabled] = useState(false);

  useEffect(() => {
    return pluginUiMessageHandler.subscribeToMessage('is_busy', ({ status }) => {
      setFormDisabled(!!status);
    });
  }, [setFormDisabled, pluginUiMessageHandler]);

  useEffect(() => {
    const handleValidate = async () => {
      setFormDisabled(true);
      setSubmitError(undefined);
      const { errors, values } = await onValidate();

      if (errors) {
        pluginUiMessageHandler.sendMessage('validation_failed', {
          errors,
        });
      } else {
        pluginUiMessageHandler.sendMessage('validation_passed', {
          values,
        });
      }
      setFormDisabled(false);
    };

    const unsubscribeSubmitFailed = pluginUiMessageHandler.subscribeToMessage(
      'submit_failed',
      ({ error }) => {
        setSubmitError(error);
      },
    );

    const unsubscribeValidate = pluginUiMessageHandler.subscribeToMessage(
      'validate',
      handleValidate,
    );

    return () => {
      unsubscribeSubmitFailed();
      unsubscribeValidate();
    };
  }, [onValidate, pluginUiMessageHandler]);

  return { formDisabled, submitError };
}

import { ReactNode, useEffect, useState } from 'react';

import {
  MessageHandler,
  FormMessageType,
  FormMessagePayload,
  PluginUiMessageType,
  PluginUiMessagePayload,
  formMessageTypes,
  pluginUiMessageTypes,
} from '@cloudquery/plugin-config-ui-connector';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface Props {
  children: ReactNode;
  /** Initial values for the form */
  initialValues?: {
    name: string;
    migrateMode?: 'forced' | 'safe' | undefined;
    envs: Array<{
      name: string;
      value: string;
    }>;
    spec: Record<string, any> | undefined;
    tables?: string[] | undefined;
    skipTables?: string[] | undefined;
    writeMode?: 'append' | 'overwrite' | 'overwrite-delete-stale' | undefined;
  };
  /** CloudQuery auth token for the form (required only if you plan to make API calls from the form) */
  authToken?: string;
  /** Team name for the form */
  teamName: string;
}

const formMessageHandler = new MessageHandler<
  FormMessageType,
  FormMessagePayload,
  PluginUiMessageType,
  PluginUiMessagePayload
>(formMessageTypes, pluginUiMessageTypes, window);

/**
 * This component is used in the development mode of the custom plugin config UI
 * and is used to mock the Cloud App.
 *
 * @public
 */
export function CloudAppMock({ children, initialValues, authToken, teamName }: Props) {
  const [values, setValues] = useState<string>('');
  const [errors, setErrors] = useState<string>('');
  const [implementsCustomFooter, setImplementsCustomFooter] = useState<boolean>(false);

  useEffect(() => {
    formMessageHandler.sendMessage('init', {
      initialValues: initialValues
        ? {
            migrateMode: initialValues.migrateMode,
            writeMode: initialValues.writeMode,
            tables: initialValues.tables,
            skipTables: initialValues.skipTables,
            ...initialValues,
          }
        : undefined,
      teamName,
    });

    const unsubscribeReady = formMessageHandler.subscribeToMessageOnce(
      'ready',
      ({ implementsCustomFooter }) => {
        setImplementsCustomFooter(!!implementsCustomFooter);
      },
    );

    const unsubscribeOnPreviousStep = formMessageHandler.subscribeToMessage(
      'go_to_previous_step',
      () => {
        alert('Previous step');
      },
    );

    const unsubscribeOnDeleted = formMessageHandler.subscribeToMessage('deleted', async () => {
      alert('Deleted');
    });

    const unsubscribeOnCancel = formMessageHandler.subscribeToMessage('cancel', () => {
      alert('Cancel');
    });

    const unsubscribeOnSubmitted = formMessageHandler.subscribeToMessage('submitted', async () => {
      alert('Submitted');
    });

    const apiRequestAbortControllers: Record<string, AbortController> = {};
    const unsubscribeApiRequest = formMessageHandler.subscribeToMessage(
      'api_call_request',
      async ({ body, endpoint, id, method, options }) => {
        apiRequestAbortControllers[id] = new AbortController();
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('Authorization', `Bearer ${authToken}`);

        try {
          const response = await fetch(endpoint, {
            body: JSON.stringify(body),
            headers,
            method,
            mode: options?.mode,
            signal: apiRequestAbortControllers[id].signal,
          });

          const responseBody = await response.json();

          formMessageHandler.sendMessage('api_call_response', {
            body: responseBody,
            endpoint,
            headers: Object.fromEntries(response.headers.entries()),
            id,
            ok: response.ok,
            status: response.status,
          });
        } catch (error: any) {
          formMessageHandler.sendMessage('api_call_response', {
            body: error,
            endpoint,
            headers: {},
            id,
            ok: false,
            status: error.status,
          });
        } finally {
          delete apiRequestAbortControllers[id];
        }
      },
    );

    const unsubscribeAbortRequest = formMessageHandler.subscribeToMessage(
      'api_call_abort_request',
      ({ id }) => {
        apiRequestAbortControllers[id]?.abort();
      },
    );

    return () => {
      unsubscribeReady();
      unsubscribeOnPreviousStep();
      unsubscribeOnDeleted();
      unsubscribeOnCancel();
      unsubscribeOnSubmitted();
      unsubscribeApiRequest();
      unsubscribeAbortRequest();
    };
  }, [authToken, initialValues, teamName]);

  const handleSubmit = async () => {
    formMessageHandler.sendMessage('validate');
    let unsubscribeValidationPassed: (() => void) | undefined;
    let unsubscribeValidationFailed: (() => void) | undefined;

    try {
      const values = await new Promise((resolve, reject) => {
        unsubscribeValidationPassed = formMessageHandler.subscribeToMessageOnce(
          'validation_passed',
          ({ values }) => {
            resolve(values);
          },
        );
        unsubscribeValidationFailed = formMessageHandler.subscribeToMessageOnce(
          'validation_failed',
          ({ errors }) => reject(errors),
        );
      }).finally(() => {
        unsubscribeValidationPassed?.();
        unsubscribeValidationFailed?.();
      });

      setErrors('');
      setValues(JSON.stringify(values, null, 2));
    } catch (error) {
      unsubscribeValidationPassed?.();
      unsubscribeValidationFailed?.();

      setValues('');
      setErrors(JSON.stringify(error, null, 2));
    }
  };

  return (
    <>
      <Stack padding={2}>{children}</Stack>
      {!implementsCustomFooter && (
        <Stack direction="row" justifyContent="flex-end" spacing={2} padding={2}>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </Stack>
      )}
      <Stack padding={2}>
        <div>Values:</div>
        <pre style={{ wordBreak: 'break-all', whiteSpace: 'break-spaces' }}>{values || '-'}</pre>
        <div>Errors:</div>
        <pre style={{ wordBreak: 'break-all', whiteSpace: 'break-spaces' }}>{errors || '-'}</pre>
      </Stack>
    </>
  );
}

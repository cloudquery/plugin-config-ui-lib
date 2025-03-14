import { ReactNode, useEffect, useMemo, useState } from 'react';

import {
  MessageHandler,
  FormMessageType,
  FormMessagePayload,
  PluginUiMessageType,
  PluginUiMessagePayload,
  formMessageTypes,
  pluginUiMessageTypes,
} from '@cloudquery/plugin-config-ui-connector';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

/**
 * @public
 */
export interface CloudAppMockProps {
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
  /** User information */
  user: { id: string; name: string; email: string };
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
export function CloudAppMock({
  children,
  initialValues,
  authToken,
  teamName,
  user,
}: CloudAppMockProps) {
  const [testConnectionValues, setTestConnectionValues] = useState<Record<string, any>>();
  const [submitValues, setSubmitValues] = useState<Record<string, any>>();
  const searchParams = useMemo(() => new URLSearchParams(window.location.search), []);

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
      context: 'wizard',
      user,
    });

    const unsubscribeOnPreviousStep = formMessageHandler.subscribeToMessage(
      'go_to_previous_step',
      () => {
        alert('Previous step');
      },
    );

    const unsubscribeOnDeleted = formMessageHandler.subscribeToMessage('delete', async () => {
      alert('Delete');
    });

    const unsubscribeOnCancel = formMessageHandler.subscribeToMessage('cancel', () => {
      alert('Cancel');
    });

    const unsubscribeOnSubmitted = formMessageHandler.subscribeToMessage('submitted', async () => {
      alert('Submitted');
    });

    return () => {
      unsubscribeOnPreviousStep();
      unsubscribeOnDeleted();
      unsubscribeOnCancel();
      unsubscribeOnSubmitted();
    };
  }, [authToken, initialValues, teamName, user]);

  useEffect(() => {
    if (searchParams.size > 0 && window.opener) {
      const pluginUIMessageHandler = new MessageHandler<
        PluginUiMessageType,
        PluginUiMessagePayload,
        FormMessageType,
        FormMessagePayload
      >(pluginUiMessageTypes, formMessageTypes, window.opener);

      window.localStorage.setItem(
        'authConnectorResult',
        JSON.stringify(Object.fromEntries(searchParams.entries())),
      );

      pluginUIMessageHandler.sendMessage('close');
    } else {
      window.addEventListener('storage', () => {
        const authConnectorResult = window.localStorage.getItem('authConnectorResult');

        if (!authConnectorResult) {
          return;
        }

        try {
          const value = JSON.parse(authConnectorResult) as Record<string, string>;
          window.localStorage.removeItem('authConnectorResult');
          formMessageHandler.sendMessage('auth_connector_result', value);
        } catch {
          return;
        }
      });
    }
  }, [searchParams]);

  useEffect(() => {
    // Store the original fetch function
    const originalFetch = window.fetch;

    // Override fetch with our interceptor
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      const endpoint =
        typeof input === 'string' ? input : input instanceof URL ? input.toString() : '';
      const method = init?.method || 'GET';
      const body = init?.body;

      const isCreateTestConnection =
        new RegExp(`/teams/(?:${teamName}|)/sync-(?:source|destination)-test-connections$`).test(
          endpoint,
        ) && method === 'POST';
      const isPromoteTestConnection =
        new RegExp(
          `/teams/(?:${teamName}|)/sync-(?:source|destination)-test-connections/this-will-be-a-random-uuid/promote$`,
        ).test(endpoint) && method === 'POST';

      if (isCreateTestConnection && body) {
        setTestConnectionValues(JSON.parse(body.toString()));
      } else if (isPromoteTestConnection && body) {
        setSubmitValues(JSON.parse(body.toString()));
      }

      return originalFetch(input, init);
    };

    // Cleanup: restore original fetch
    return () => {
      window.fetch = originalFetch;
    };
  }, [teamName]);

  if (searchParams.size > 0) {
    return (
      <Stack
        spacing={4}
        sx={{
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="body1">
          Authenticated successfully.
          <br />
          You can close this window now.
        </Typography>
      </Stack>
    );
  }

  return (
    <>
      <Stack
        sx={{
          padding: 2,
        }}
      >
        {children}
      </Stack>
      <Stack
        sx={{
          padding: 2,
        }}
      >
        {testConnectionValues && (
          <>
            <div>Test Connection Values:</div>
            <pre style={{ wordBreak: 'break-all', whiteSpace: 'break-spaces' }}>
              {JSON.stringify(testConnectionValues, null, 2) || '-'}
            </pre>
          </>
        )}
        <div>Submit Values:</div>
        <pre style={{ wordBreak: 'break-all', whiteSpace: 'break-spaces' }}>
          {JSON.stringify(submitValues, null, 2) || '-'}
        </pre>
      </Stack>
    </>
  );
}

import { useCallback, useState } from 'react';

import {
  PluginUiMessageHandler,
  PluginUiMessagePayload,
} from '@cloudquery/plugin-config-ui-connector';

import { useApiCall } from './useApiCall';
import { useTestConnection } from './useTestConnection';
import { cloudQueryApiBaseUrl } from '../utils/constants';
import { isApiAbortError } from '../utils/errors';

type FormValues = PluginUiMessagePayload['current_values']['values'];

/**
 * Custom hook to handle form actions such as test connection, submit, cancel, and delete.
 *
 * @public
 */
export function useFormActions({
  getValues,
  pluginUiMessageHandler,
  pluginTeamName,
  pluginName,
  pluginKind,
  teamName,
  pluginVersion,
  isUpdating,
}: {
  pluginUiMessageHandler: PluginUiMessageHandler;
  teamName: string;
  pluginTeamName: string;
  pluginName: string;
  pluginKind: 'source' | 'destination';
  getValues: () => FormValues;
  pluginVersion: string;
  isUpdating: boolean;
}) {
  const { callApi } = useApiCall(pluginUiMessageHandler);

  const { cancelTestConnection, testConnection } = useTestConnection(pluginUiMessageHandler);
  const [testConnectionError, setTestConnectionError] = useState<string>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [submitPayload, setSubmitPayload] = useState<
    FormValues & {
      connectionId: string;
    }
  >();
  const [submitError, setSubmitError] = useState<any>();

  const handleTestConnection = useCallback(async () => {
    setSubmitError(undefined);
    setTestConnectionError(undefined);
    setIsSubmitting(false);
    setSubmitPayload(undefined);

    setIsTestingConnection(true);

    const values = getValues();

    const connectionId = await testConnection(
      {
        path: `${pluginTeamName}/${pluginName}`,
        version: pluginVersion,
        spec: values.spec,
        env: values.envs,
        name: values.name,
      },
      teamName,
      pluginKind,
      isUpdating,
    ).catch((error) => {
      if (!isApiAbortError(error)) {
        setTestConnectionError(error.message || 'Unknown error');
      }

      return null;
    });

    if (!connectionId) {
      setIsTestingConnection(false);

      return null;
    }

    setSubmitPayload({
      ...values,
      connectionId,
    });
    setIsTestingConnection(false);

    return connectionId;
  }, [
    getValues,
    isUpdating,
    pluginKind,
    pluginName,
    pluginTeamName,
    pluginVersion,
    teamName,
    testConnection,
  ]);

  const handleSubmit = async () => {
    if (!submitPayload) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { requestPromise: promoteTestConnectionRequest } = callApi(
        `${cloudQueryApiBaseUrl}/teams/${teamName}/sync-${pluginKind}-test-connections/${submitPayload.connectionId}/promote`,
        'POST',
        {
          name: submitPayload.name,
        },
      );
      await promoteTestConnectionRequest;

      const payload =
        pluginKind === 'source'
          ? {
              tables: submitPayload.tables,
              skip_tables: submitPayload.skipTables,
            }
          : {
              migrate_mode: submitPayload.migrateMode,
              write_mode: submitPayload.writeMode,
            };
      const { requestPromise: updateSyncResourceRequest } = callApi(
        `${cloudQueryApiBaseUrl}/teams/${teamName}/sync-${pluginKind === 'source' ? 'sources' : 'destinations'}/${submitPayload.name}`,
        'PATCH',
        payload,
      );
      await updateSyncResourceRequest;

      pluginUiMessageHandler.sendMessage('submitted', submitPayload);
    } catch (error: any) {
      setSubmitError(error?.body || error);
      pluginUiMessageHandler.sendMessage('submit_failed', error?.body || error);
    } finally {
      setIsSubmitting(false);
      setSubmitPayload(undefined);
    }
  };

  const handleCancelTestConnection = () => {
    cancelTestConnection();
    setTestConnectionError(undefined);
    setIsTestingConnection(false);
    setSubmitPayload(undefined);
  };

  const handleGoToPreviousStep = () => {
    pluginUiMessageHandler.sendMessage('go_to_previous_step');
  };

  const handleCancel = () => {
    pluginUiMessageHandler.sendMessage('cancel');
  };

  const handleDelete = async () => {
    const { requestPromise } = callApi(
      `${cloudQueryApiBaseUrl}/teams/${teamName}/sync-sources/${getValues().name}`,
      'DELETE',
    );
    await requestPromise;

    pluginUiMessageHandler.sendMessage('deleted');
  };

  return {
    submitError,
    handleCancel,
    handleCancelTestConnection,
    handleDelete,
    handleGoToPreviousStep,
    handleTestConnection,
    handleSubmit,
    isSubmitting,
    isTestingConnection,
    testConnectionError,
    submitPayload,
  };
}

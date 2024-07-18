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

interface SyncSourcePayload {
  tables?: string[];
  skipTables?: string[];
}

interface SyncDestinationPayload {
  writeMode?: 'append' | 'overwrite' | 'overwrite-delete-stale';
  migrateMode?: 'forced' | 'safe';
}

/**
 * Custom hook to handle form actions such as test connection, submit, cancel, and delete.
 *
 * @public
 */
export function useFormActions<PluginKind extends 'source' | 'destination'>({
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
  pluginKind: PluginKind;
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

  const isDataSource = useCallback(
    (
      submitData: SyncSourcePayload | SyncDestinationPayload | undefined,
      pluginKind: PluginKind,
    ): submitData is SyncSourcePayload | undefined => {
      return pluginKind === 'source';
    },
    [],
  );

  const handleSubmit = useCallback(
    async (
      submitData?: PluginKind extends 'source' ? SyncSourcePayload : SyncDestinationPayload,
    ) => {
      if (!submitPayload) {
        return;
      }

      setIsSubmitting(true);

      try {
        const pluginKindPayload = isDataSource(submitData, pluginKind)
          ? {
              tables: submitData ? submitData.tables : submitPayload.tables,
              skip_tables: submitData ? submitData.skipTables : submitPayload.skipTables,
            }
          : {
              migrate_mode: submitData ? submitData.migrateMode : submitPayload.migrateMode,
              write_mode: submitData ? submitData.writeMode : submitPayload.writeMode,
            };
        const { requestPromise: promoteTestConnectionRequest } = callApi(
          `${cloudQueryApiBaseUrl}/teams/${teamName}/sync-${pluginKind}-test-connections/${submitPayload.connectionId}/promote`,
          'POST',
          {
            name: submitPayload.name,
            ...pluginKindPayload,
          },
        );
        await promoteTestConnectionRequest;

        const { requestPromise: updateSyncResourceRequest } = callApi(
          `${cloudQueryApiBaseUrl}/teams/${teamName}/sync-${pluginKind === 'source' ? 'sources' : 'destinations'}/${submitPayload.name}`,
          'PATCH',
          { ...pluginKindPayload, last_update_source: 'ui', spec: submitPayload.spec },
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
    },
    [callApi, isDataSource, pluginKind, pluginUiMessageHandler, submitPayload, teamName],
  );

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

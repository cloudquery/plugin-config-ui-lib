import { useCallback, useState } from 'react';

import {
  PluginUiMessageHandler,
  PluginUiMessagePayload,
} from '@cloudquery/plugin-config-ui-connector';

import { useTestConnection } from './useTestConnection';
import customFetch from '../utils/customFetch';
import { isApiAbortError } from '../utils/errors';

/**
 * @public
 */
export type FormActionsFormValues = PluginUiMessagePayload['submitted']['submitPayload'];

/**
 * @public
 */
export interface FormActionsSyncSourcePayload {
  tables?: string[];
  skipTables?: string[];
}

/**
 * @public
 */
export interface FormActionsSyncDestinationPayload {
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
  getValues: () => FormActionsFormValues;
  pluginVersion: string;
  isUpdating: boolean;
  apiBaseUrl?: string;
}) {
  const { cancelTestConnection, testConnection, testConnectionId } = useTestConnection();
  const [testConnectionError, setTestConnectionError] = useState<Error & { code?: string }>();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [submitPayload, setSubmitPayload] = useState<
    FormActionsFormValues & {
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
        connector_id: values.connectorId,
        onboarding_id: values.onboardingId,
      },
      teamName,
      pluginKind,
      isUpdating,
    ).catch((error) => {
      if (!isApiAbortError(error)) {
        setTestConnectionError(error);
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
      submitData: FormActionsSyncSourcePayload | FormActionsSyncDestinationPayload | undefined,
      pluginKind: PluginKind,
    ): submitData is FormActionsSyncSourcePayload | undefined => {
      return pluginKind === 'source';
    },
    [],
  );

  const handleSubmit = useCallback(
    async (
      submitData?: PluginKind extends 'source'
        ? FormActionsSyncSourcePayload
        : FormActionsSyncDestinationPayload,
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
              overwrite_source: !!isUpdating,
            }
          : {
              migrate_mode: submitData ? submitData.migrateMode : submitPayload.migrateMode,
              write_mode: submitData ? submitData.writeMode : submitPayload.writeMode,
              overwrite_destination: !!isUpdating,
            };
        await customFetch<any>({
          method: 'POST',
          url: `/teams/${teamName}/sync-${pluginKind}-test-connections/${submitPayload.connectionId}/promote`,
          data: {
            name: submitPayload.name,
            display_name: submitPayload.displayName,
            ...pluginKindPayload,
          },
        });

        const { data: updatedSyncResource } = await customFetch<any>({
          method: 'PATCH',
          url: `/teams/${teamName}/sync-${pluginKind === 'source' ? 'sources' : 'destinations'}/${submitPayload.name}`,
          data: { ...pluginKindPayload, last_update_source: 'ui' },
        });

        pluginUiMessageHandler.sendMessage('submitted', {
          submitPayload,
          resource: updatedSyncResource,
        });
      } catch (error: any) {
        setSubmitError(error?.body || error);
      } finally {
        setIsSubmitting(false);
        setSubmitPayload(undefined);
      }
    },
    [isUpdating, isDataSource, pluginKind, pluginUiMessageHandler, submitPayload, teamName],
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

  const handleDelete = async () => {
    pluginUiMessageHandler.sendMessage('delete');
  };

  return {
    submitError,
    handleCancelTestConnection,
    handleDelete,
    handleGoToPreviousStep,
    handleTestConnection,
    handleSubmit,
    isSubmitting,
    isTestingConnection,
    testConnectionError,
    submitPayload,
    testConnectionId,
  };
}

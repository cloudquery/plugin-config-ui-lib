import { useState } from 'react';

import { PluginUiMessagePayload } from '@cloudquery/plugin-config-ui-connector';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { FormFooterDeleteDialog } from './deleteDialog';
import { FormFooterTestConnectionResult } from './testConnectionResult';

type FormValues = PluginUiMessagePayload['current_values']['values'];

interface Props {
  /** Indicates whether the form is currently being updated */
  isUpdating: boolean;
  /** The type of plugin, either 'source' or 'destination' */
  pluginKind: 'source' | 'destination';
  /** Function to get the current form values */
  getValues: () => FormValues;
  /** Indicates whether the connection is currently being tested */
  isTestingConnection: boolean;
  /** Indicates whether the form is currently being submitted */
  isSubmitting: boolean;
  /** Error message for connection testing, if any */
  testConnectionError: string | undefined;
  /** Payload to be submitted, containing form values and connection ID */
  submitPayload: (FormValues & { connectionId: string }) | undefined;
  /** Callback to cancel the current action */
  onCancel: () => void;
  /** Callback to cancel the connection test */
  onCancelTestConnection: () => void;
  /** Callback to handle delete action */
  onDelete: () => Promise<void>;
  /** Callback to navigate to the previous step */
  onGoToPreviousStep: () => void;
  /** Callback to handle form submission */
  onSubmit: () => void;
}

/**
 * FormFooter component that renders the footer section of a form, including
 * buttons for navigating to the previous step, deleting the form, testing the
 * connection, and submitting the form.
 *
 * @public
 */
export function FormFooter({
  isUpdating,
  pluginKind,
  getValues,
  isSubmitting,
  isTestingConnection,
  testConnectionError,
  submitPayload,
  onCancel,
  onCancelTestConnection,
  onDelete,
  onGoToPreviousStep,
  onSubmit,
}: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" marginTop={4} spacing={2}>
        <Box>
          {!isUpdating && (
            <Button color="secondary" onClick={onGoToPreviousStep} size="medium">
              Previous step
            </Button>
          )}
          {!!isUpdating && (
            <>
              <FormFooterDeleteDialog
                pluginKind={pluginKind}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={onDelete}
                open={deleteDialogOpen}
                name={getValues().name}
              />
              <Button
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
                size="medium"
                variant="contained"
              >
                Delete
              </Button>
            </>
          )}
        </Box>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Button disabled={isTestingConnection || isSubmitting} onClick={onCancel} size="medium">
            Cancel
          </Button>
          <LoadingButton
            loading={isTestingConnection || isSubmitting}
            size="medium"
            variant="contained"
            type="submit"
          >
            Test connection
          </LoadingButton>
        </Stack>
      </Stack>
      {(isTestingConnection || testConnectionError || submitPayload) && (
        <FormFooterTestConnectionResult
          failureReason={testConnectionError}
          isLoading={isTestingConnection}
          onCancel={onCancelTestConnection}
          onSuccess={onSubmit}
        />
      )}
    </>
  );
}
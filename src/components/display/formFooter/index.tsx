import { PluginUiMessagePayload } from '@cloudquery/plugin-config-ui-connector';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { FormFooterTestConnectionResult } from './testConnectionResult';

type FormValues = PluginUiMessagePayload['current_values']['values'];

/**
 * @public
 */
export interface FormFooterProps {
  /** Indicates whether the form is currently being updated */
  isUpdating: boolean;
  /** Indicates whether the connection is currently being tested */
  isTestingConnection: boolean;
  /** Indicates whether the form is currently being submitted */
  isSubmitting: boolean;
  /** Error message for connection testing, if any */
  testConnectionError: (Error & { code?: string }) | undefined;
  /** The type of plugin, either 'source' or 'destination' */
  pluginKind: 'source' | 'destination';
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
  /** Label for the submit button */
  submitLabel?: string;
  /** Indicates whether the submit button should be disabled */
  submitDisabled?: boolean;
  /** Callback to handle test connection success */
  onTestConnectionSuccess: () => void;
  /** Error message for submission, if any */
  submitErrorMessage?: string;
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
  isSubmitting,
  isTestingConnection,
  testConnectionError,
  pluginKind,
  submitPayload,
  onCancel,
  onCancelTestConnection,
  onDelete,
  onGoToPreviousStep,
  onTestConnectionSuccess,
  submitLabel,
  submitDisabled,
  submitErrorMessage,
}: FormFooterProps) {
  const isBusy = isTestingConnection || isSubmitting;

  return (
    <Stack spacing={4}>
      <Stack direction="row" justifyContent="space-between" marginTop={4} spacing={2}>
        <Stack alignItems="center" direction="row" spacing={2}>
          {!!isUpdating && (
            <Button
              disabled={isBusy}
              color="error"
              onClick={onDelete}
              size="medium"
              variant="contained"
            >
              {`Delete this ${pluginKind}`}
            </Button>
          )}
          <Button disabled={isBusy} color="secondary" onClick={onGoToPreviousStep} size="medium">
            Previous step
          </Button>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Button disabled={isBusy} onClick={onCancel} size="medium">
            Cancel
          </Button>
          <LoadingButton
            loading={isBusy}
            size="medium"
            variant="contained"
            type="submit"
            disabled={submitDisabled}
          >
            {submitLabel || 'Test connection'}
          </LoadingButton>
        </Stack>
      </Stack>
      {(isTestingConnection || testConnectionError || submitPayload) && (
        <FormFooterTestConnectionResult
          failureError={testConnectionError}
          isLoading={isTestingConnection}
          onCancel={onCancelTestConnection}
          onSuccess={onTestConnectionSuccess}
          pluginKind={pluginKind}
        />
      )}
      {submitErrorMessage && (
        <Alert color="error" severity="error" variant="filled">
          <AlertTitle>Submission error</AlertTitle>
          {submitErrorMessage.charAt(0).toUpperCase() + submitErrorMessage.slice(1)}
        </Alert>
      )}
    </Stack>
  );
}

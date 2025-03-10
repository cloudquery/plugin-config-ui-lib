import { PluginUiMessagePayload } from '@cloudquery/plugin-config-ui-connector';
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
  /** Indicates whether the previous step button should be shown */
  showPreviousStepButton: boolean;
  /** The name of the plugin */
  pluginName: string;
  /** The name of the current team */
  teamName: string;
  /** The ID of the test connection */
  testConnectionId?: string;
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
  showPreviousStepButton,
  pluginName,
  teamName,
  testConnectionId,
}: FormFooterProps) {
  const isBusy = isTestingConnection || isSubmitting;

  return (
    <Stack spacing={4}>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: 'space-between',
          marginTop: 4,
          whiteSpace: 'nowrap',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
        >
          {!!isUpdating && (
            <Button
              disabled={isBusy}
              color="error"
              onClick={onDelete}
              size="medium"
              variant="contained"
            >
              Delete this {pluginKind === 'source' ? 'integration' : 'destination'}
            </Button>
          )}
          {showPreviousStepButton && (
            <Button disabled={isBusy} color="secondary" onClick={onGoToPreviousStep} size="medium">
              Previous step
            </Button>
          )}
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
          }}
        >
          <Button disabled={isBusy} onClick={onCancel} size="medium">
            Cancel
          </Button>
          <Button
            loading={isBusy}
            size="medium"
            variant="contained"
            type="submit"
            disabled={submitDisabled}
          >
            {submitLabel || 'Test connection and save'}
          </Button>
        </Stack>
      </Stack>
      {(isTestingConnection || testConnectionError || submitPayload) && (
        <FormFooterTestConnectionResult
          failureError={testConnectionError}
          isLoading={isTestingConnection}
          onCancel={onCancelTestConnection}
          onSuccess={onTestConnectionSuccess}
          pluginKind={pluginKind}
          pluginName={pluginName}
          teamName={teamName}
          testConnectionId={testConnectionId}
        />
      )}
    </Stack>
  );
}

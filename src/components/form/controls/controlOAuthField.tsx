import { useEffect } from 'react';

import CheckIcon from '@mui/icons-material/Check';

import Button from '@mui/material/Button';

import FormHelperText from '@mui/material/FormHelperText';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useFormContext } from 'react-hook-form';

import { usePluginContext } from '../../../context';
import { useOauthConnector } from '../../../hooks';
import { cloudQueryOauthConnectorUrl } from '../../../utils';

/**
 * @public
 */
export type ControlOAuthFieldProps = {
  shouldAuthenticate?: () => Promise<boolean>;
  getConnectPayloadSpec?: (formValues: any) => Promise<Record<string, any>>;
  getFinishPayloadSpec?: (formValues: any) => Promise<Record<string, any>>;
};

/**
 * This component is a renders an OAuth authentication button and handles the data transfer process.
 *
 * @public
 */
export function ControlOAuthField({
  shouldAuthenticate,
  getConnectPayloadSpec,
  getFinishPayloadSpec,
}: ControlOAuthFieldProps) {
  const form = useFormContext();
  const { plugin, teamName, config, pluginUiMessageHandler } = usePluginContext();
  const { watch, formState, setValue, getValues } = form;

  const {
    authConnectorResult,
    authenticate,
    connectorId,
    error: authenticateError,
    isLoading,
    cancel: cancelAuthentication,
  } = useOauthConnector({
    pluginKind: plugin.kind as any,
    pluginName: plugin.name,
    pluginTeamName: plugin.team,
    pluginUiMessageHandler,
    successBaseUrl: cloudQueryOauthConnectorUrl,
    teamName,
    getConnectPayloadSpec: async () => await getConnectPayloadSpec?.(getValues()),
    getFinishPayloadSpec: async () => await getFinishPayloadSpec?.(getValues()),
  });

  const handleAuthenticate = async () => {
    let proceed = true;
    if (shouldAuthenticate) {
      proceed = await shouldAuthenticate();
    }
    if (proceed) {
      authenticate();
    }
  };

  useEffect(() => {
    if (authConnectorResult && connectorId) {
      setValue('connectorId', connectorId);
    }
  }, [authConnectorResult, connectorId, setValue]);

  useEffect(() => {
    if (authenticateError) {
      setValue('connectorId', undefined);
    }
  }, [authenticateError, setValue]);

  const connectorIdValue = watch('connectorId');

  return (
    <Stack
      sx={{
        gap: 1.5,
        paddingTop: 2,
      }}
    >
      <Stack
        direction="row"
        sx={{
          gap: 1,
          alignItems: 'center',
        }}
      >
        <Button
          size="large"
          variant="contained"
          onClick={handleAuthenticate}
          loading={isLoading}
          fullWidth={false}
          disabled={!!connectorIdValue}
          endIcon={connectorIdValue && <CheckIcon />}
        >
          {connectorIdValue && !isLoading
            ? `${config.label} connected successfully`
            : 'Authenticate'}
        </Button>
        {isLoading && (
          <Button color="inherit" onClick={cancelAuthentication}>
            Cancel authentication
          </Button>
        )}
      </Stack>
      {!authenticateError && !formState.errors.connectorId && !isLoading && connectorIdValue && (
        <Typography variant="body2" color="textSecondary">
          To reconnect CloudQuery via {config.label}{' '}
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link underline="always" sx={{ cursor: 'pointer' }} onClick={handleAuthenticate}>
            click here
          </Link>
        </Typography>
      )}
      {!authenticateError && !formState.errors.connectorId && !isLoading && !connectorIdValue && (
        <Typography variant="body2" color="textSecondary">
          This will open a new browser tab.
        </Typography>
      )}
      {!!authenticateError && (
        <FormHelperText error={true} sx={{ marginTop: 2 }}>
          {authenticateError.message ||
            'Something went wrong during authentication. Please try again.'}
        </FormHelperText>
      )}
      {!authenticateError && formState.errors.connectorId && (
        <FormHelperText error={true} sx={{ marginTop: 2 }}>
          {`You must authenticate with ${config.label} to continue.`}
        </FormHelperText>
      )}
    </Stack>
  );
}

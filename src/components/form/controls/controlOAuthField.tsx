import { useEffect } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';

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
 * This component is a renders an OAuth authentication button and handles the data transfer process.
 *
 * @public
 */
export function ControlOAuthField() {
  const form = useFormContext();
  const { plugin, teamName, config, pluginUiMessageHandler } = usePluginContext();
  const { watch, formState, setValue } = form;

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
  });

  useEffect(() => {
    if (authConnectorResult && connectorId) {
      setValue('connectorId', connectorId);
    }
  }, [authConnectorResult, connectorId, setValue]);

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
        <LoadingButton
          size="large"
          variant={connectorIdValue ? 'outlined' : 'contained'}
          onClick={authenticate}
          loading={isLoading}
          fullWidth={false}
          disabled={connectorIdValue}
        >
          {connectorIdValue && !isLoading
            ? `${config.label} connected successfully`
            : 'Authenticate'}
        </LoadingButton>
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
          <Link underline="always" sx={{ cursor: 'pointer' }} onClick={authenticate}>
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

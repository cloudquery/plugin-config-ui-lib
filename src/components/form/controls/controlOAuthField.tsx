import { useEffect } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';

import { useFormContext } from 'react-hook-form';

import { usePluginContext } from '../../../context';
import { useOauthConnector } from '../../../hooks';
import { cloudQueryApiBaseUrl } from '../../../utils';
import { getOauthSuccessBaseUrl } from '../../../utils/getOauthSuccessBaseUrl';

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
  } = useOauthConnector({
    apiBaseUrl: cloudQueryApiBaseUrl,
    pluginKind: plugin.kind as any,
    pluginName: plugin.name,
    pluginTeamName: plugin.team,
    pluginUiMessageHandler,
    successBaseUrl: getOauthSuccessBaseUrl(),
    teamName,
  });

  useEffect(() => {
    if (authConnectorResult && connectorId) {
      setValue('connectorId', connectorId);
    }
  }, [authConnectorResult, connectorId, setValue]);

  const connectorIdValue = watch('connectorId');

  return (
    <Stack gap={1} pt={2}>
      <Box>
        <LoadingButton
          size="large"
          variant={connectorIdValue ? 'outlined' : 'contained'}
          onClick={authenticate}
          loading={isLoading}
          fullWidth={false}
        >
          {connectorIdValue ? 'Re-authenticate' : 'Authenticate'}
        </LoadingButton>
      </Box>

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
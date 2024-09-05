import { useEffect } from 'react';

import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import Box from '@mui/system/Box';

import { useFormContext } from 'react-hook-form';

import { usePluginContext } from '../../context/plugin';
import { useOauthConnector } from '../../hooks';
import { cloudQueryApiBaseUrl } from '../../utils';
import { getOauthSuccessBaseUrl } from '../../utils/getOauthSuccessBaseUrl';

/**
 * This component is a renders an OAuth authentication button and handles the data transfer process.
 *
 * @public
 */
export function ControlOAuth({
  pluginUiMessageHandler,
}: {
  pluginUiMessageHandler: any; // TODO: delete after iframe deprecation
}) {
  const form = useFormContext();
  const { plugin, teamName, config } = usePluginContext();
  const { watch, formState, setValue } = form;

  const {
    authConnectorResult,
    authenticate,
    connectorId,
    error: authenticateError,
    isLoading,
    cancel,
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
        <Button
          size="large"
          variant={connectorIdValue ? 'outlined' : 'contained'}
          onClick={isLoading ? cancel : authenticate}
          fullWidth={false}
        >
          {isLoading ? (
            <Stack direction="row" alignItems="center" gap={1}>
              <CircularProgress size={20} />
              <span>Cancel</span>
            </Stack>
          ) : connectorIdValue ? (
            'Re-authenticate'
          ) : (
            'Authenticate'
          )}
          {connectorIdValue ? 'Re-authenticate' : 'Authenticate'}
        </Button>
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

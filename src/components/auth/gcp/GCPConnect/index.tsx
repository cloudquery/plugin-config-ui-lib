import React, { useEffect } from 'react';

import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';

import CheckIcon from '@mui/icons-material/Check';
import { FormControl, FormHelperText } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useFormContext } from 'react-hook-form';

import { usePluginContext } from '../../../../context';
import { getFieldHelperText } from '../../../../utils';
import { CodeSnippet } from '../../../display';
import { useAuthConnector } from '../../hooks/useAuthConnector';

/**
 * @public
 */
export type GCPConnectProps = {
  variant?: 'link' | 'button';
  pluginUiMessageHandler: PluginUiMessageHandler;
};

/**
 * @public
 * Encapsulatees the GCP Connector logic in a Button or Link.
 */
export function GCPConnect({ variant = 'button', pluginUiMessageHandler }: GCPConnectProps) {
  const { plugin, teamName } = usePluginContext();
  const form = useFormContext();
  const connectorId = form.watch('connectorId');
  const serviceAccount = form.watch('_serviceAccount');

  useEffect(() => {
    if (!serviceAccount) {
      form.setValue('_serviceAccount', 'Pending launch of the IAM Console...');
    }
  }, [serviceAccount, form]);

  const redirect = () =>
    pluginUiMessageHandler.sendMessage('open_url', {
      url: 'https://console.cloud.google.com/iam-admin/iam',
    });

  const { createAndAuthenticateConnector, authenticationLoading, authenticationError } =
    useAuthConnector({ pluginUiMessageHandler, kind: 'gcp' });

  const getCredentials = async () => {
    const authProps = {
      connectorId,
      pluginName: plugin.name,
      pluginTeamName: plugin.team,
      pluginKind: plugin.kind as any,
      teamName,
    };
    if (connectorId) {
      const { service_account } = await createAndAuthenticateConnector<{ service_account: string }>(
        authProps,
      );
      form.setValue('_serviceAccount', service_account);
    } else {
      const { connectorId, service_account } = await createAndAuthenticateConnector<{
        service_account: string;
        connectorId: string;
      }>(authProps);

      form.setValue('connectorId', connectorId);
      if (service_account) {
        form.setValue('_serviceAccount', service_account);
      }
    }
  };

  const handleClick = async () => {
    if (connectorId) {
      redirect();
    } else {
      await getCredentials();
      redirect();
    }
  };

  return variant === 'button' ? (
    <Stack gap={2}>
      <Stack gap={1}>
        <Box>
          <FormControl>
            <Button
              disabled={!!connectorId || authenticationLoading}
              size="large"
              variant="contained"
              fullWidth={false}
              onClick={handleClick}
              endIcon={connectorId && <CheckIcon />}
            >
              {connectorId ? 'Successfully created GCP credentials' : 'Create credentials'}
            </Button>
            {!!form.formState.errors?.['connectorId']?.message && (
              <FormHelperText error={true}>
                {getFieldHelperText(form.formState.errors?.['connectorId']?.message as string, '')}
              </FormHelperText>
            )}
          </FormControl>
        </Box>

        {connectorId ? (
          <Typography variant="body2" color="textSecondary">
            To reopen the GCP IAM Console {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link sx={{ cursor: 'pointer' }} onClick={handleClick}>
              click here
            </Link>
          </Typography>
        ) : (
          <Typography variant="body2" color="textSecondary">
            This will open a new browser tab.
          </Typography>
        )}
      </Stack>

      <Stack>
        <Typography variant="body2">Service Account:</Typography>
        <Box>
          <CodeSnippet text={serviceAccount} />
        </Box>
      </Stack>

      {authenticationError && (
        <FormControl>
          {
            <FormHelperText error={true}>
              Network error: {authenticationError.message}
            </FormHelperText>
          }
        </FormControl>
      )}
    </Stack>
  ) : (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link component="button" onClick={handleClick}>
      IAM Console
    </Link>
  );
}
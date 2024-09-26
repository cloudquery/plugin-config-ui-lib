import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

import { createThemeOptions } from '@cloudquery/cloud-ui';
import {
  MessageHandler,
  FormMessageType,
  FormMessagePayload,
  PluginUiMessageType,
  PluginUiMessagePayload,
  formMessageTypes,
  pluginUiMessageTypes,
} from '@cloudquery/plugin-config-ui-connector';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import createTheme from '@mui/material/styles/createTheme';
import Typography from '@mui/material/Typography';
import toast, { Toaster as HotToaster, ToastBar } from 'react-hot-toast';

/**
 * @public
 */
export interface CloudAppMockProps {
  children: ReactNode;
  /** Initial values for the form */
  initialValues?: {
    name: string;
    migrateMode?: 'forced' | 'safe' | undefined;
    envs: Array<{
      name: string;
      value: string;
    }>;
    spec: Record<string, any> | undefined;
    tables?: string[] | undefined;
    skipTables?: string[] | undefined;
    writeMode?: 'append' | 'overwrite' | 'overwrite-delete-stale' | undefined;
  };
  /** CloudQuery auth token for the form (required only if you plan to make API calls from the form) */
  authToken?: string;
  /** Team name for the form */
  teamName: string;
  /** User information */
  user: { id: string; name: string; email: string };
}

const formMessageHandler = new MessageHandler<
  FormMessageType,
  FormMessagePayload,
  PluginUiMessageType,
  PluginUiMessagePayload
>(formMessageTypes, pluginUiMessageTypes, window);

/**
 * This component is used in the development mode of the custom plugin config UI
 * and is used to mock the Cloud App.
 *
 * @public
 */
export function CloudAppMock({
  children,
  initialValues,
  authToken,
  teamName,
  user,
}: CloudAppMockProps) {
  const theme = createTheme(createThemeOptions());
  const { palette, typography, shadows } = theme;
  const [values, setValues] = useState<string>('');
  const [errors, setErrors] = useState<string>('');
  const [implementsCustomFooter, setImplementsCustomFooter] = useState<boolean>(false);
  const [lightboxProps, setLightboxProps] = useState<
    PluginUiMessagePayload['show_lightbox'] & { isLoaded: boolean }
  >();
  const searchParams = useMemo(() => new URLSearchParams(window.location.search), []);

  const handleSubmit = async () => {
    formMessageHandler.sendMessage('validate');
    let unsubscribeValidationPassed: (() => void) | undefined;
    let unsubscribeValidationFailed: (() => void) | undefined;

    formMessageHandler.sendMessage('is_busy', {
      status: true,
    });

    try {
      const values = await new Promise((resolve, reject) => {
        unsubscribeValidationPassed = formMessageHandler.subscribeToMessageOnce(
          'validation_passed',
          ({ values }) => {
            resolve(values);
          },
        );
        unsubscribeValidationFailed = formMessageHandler.subscribeToMessageOnce(
          'validation_failed',
          ({ errors }) => reject(errors),
        );
      }).finally(() => {
        unsubscribeValidationPassed?.();
        unsubscribeValidationFailed?.();
      });

      setErrors('');
      setValues(JSON.stringify(values, null, 2));
    } catch (error) {
      unsubscribeValidationPassed?.();
      unsubscribeValidationFailed?.();

      setValues('');
      setErrors(JSON.stringify(error, null, 2));
    }

    formMessageHandler.sendMessage('is_busy', {
      status: false,
    });
  };

  const handleLightboxClose = useCallback(() => {
    setLightboxProps(undefined);
  }, []);

  const handleLightboxContainerClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const closestImage = (event.target as HTMLDivElement).closest('img');
      if (closestImage) {
        return;
      }

      handleLightboxClose();
    },
    [handleLightboxClose],
  );

  useEffect(() => {
    formMessageHandler.sendMessage('init', {
      initialValues: initialValues
        ? {
            migrateMode: initialValues.migrateMode,
            writeMode: initialValues.writeMode,
            tables: initialValues.tables,
            skipTables: initialValues.skipTables,
            ...initialValues,
          }
        : undefined,
      teamName,
      context: 'wizard',
      user,
    });

    const unsubscribeReady = formMessageHandler.subscribeToMessageOnce(
      'ready',
      ({ implementsCustomFooter }) => {
        setImplementsCustomFooter(!!implementsCustomFooter);
      },
    );

    const unsubscribeOnPreviousStep = formMessageHandler.subscribeToMessage(
      'go_to_previous_step',
      () => {
        alert('Previous step');
      },
    );

    const unsubscribeOnDeleted = formMessageHandler.subscribeToMessage('delete', async () => {
      alert('Delete');
    });

    const unsubscribeOnCancel = formMessageHandler.subscribeToMessage('cancel', () => {
      alert('Cancel');
    });

    const unsubscribeOnSubmitted = formMessageHandler.subscribeToMessage('submitted', async () => {
      alert('Submitted');
    });

    let unsubscribeClose: (() => void) | undefined;
    const unsubscribeOpenUrl = formMessageHandler.subscribeToMessage('open_url', ({ url }) => {
      const linkWindow = window.open(url, '_blank');
      unsubscribeClose = formMessageHandler.subscribeToMessageOnce('close', () => {
        linkWindow?.close();
      });
    });

    const unsubscribeShowLightbox = formMessageHandler.subscribeToMessage(
      'show_lightbox',
      (payload) => setLightboxProps({ ...payload, isLoaded: false }),
    );

    const unsubscribeShowToast = formMessageHandler.subscribeToMessage('show_toast', (payload) => {
      switch (payload.type) {
        case 'success': {
          toast.success(payload.message, { duration: payload.duration });
          break;
        }
        case 'error': {
          toast.error(payload.message, { duration: payload.duration });
          break;
        }
        default: {
          toast(payload.message, { duration: payload.duration });
        }
      }
    });

    const apiRequestAbortControllers: Record<string, AbortController> = {};
    const unsubscribeApiRequest = formMessageHandler.subscribeToMessage(
      'api_call_request',
      async ({ body, endpoint, id, method, options }) => {
        apiRequestAbortControllers[id] = new AbortController();
        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('Accept', 'application/json');
        headers.set('__session', `${authToken}`);

        try {
          const response = await fetch(endpoint, {
            body: JSON.stringify(body),
            headers,
            method,
            mode: options?.mode,
            signal: apiRequestAbortControllers[id].signal,
          });

          const responseBody = await response.json().catch(() => null);

          formMessageHandler.sendMessage('api_call_response', {
            body: responseBody,
            endpoint,
            headers: Object.fromEntries(response.headers.entries()),
            id,
            ok: response.ok,
            status: response.status,
          });
        } catch (error: any) {
          formMessageHandler.sendMessage('api_call_response', {
            body: error,
            endpoint,
            headers: {},
            id,
            ok: false,
            status: error.status,
          });
        } finally {
          delete apiRequestAbortControllers[id];
        }
      },
    );

    const unsubscribeAbortRequest = formMessageHandler.subscribeToMessage(
      'api_call_abort_request',
      ({ id }) => {
        apiRequestAbortControllers[id]?.abort();
      },
    );

    return () => {
      unsubscribeReady();
      unsubscribeOnPreviousStep();
      unsubscribeOnDeleted();
      unsubscribeOnCancel();
      unsubscribeOnSubmitted();
      unsubscribeApiRequest();
      unsubscribeAbortRequest();
      unsubscribeOpenUrl();
      unsubscribeShowLightbox();
      unsubscribeShowToast();
      unsubscribeClose?.();
    };
  }, [authToken, initialValues, teamName, user]);

  useEffect(() => {
    if (searchParams.size > 0 && window.opener) {
      const pluginUIMessageHandler = new MessageHandler<
        PluginUiMessageType,
        PluginUiMessagePayload,
        FormMessageType,
        FormMessagePayload
      >(pluginUiMessageTypes, formMessageTypes, window.opener);

      window.localStorage.setItem(
        'authConnectorResult',
        JSON.stringify(Object.fromEntries(searchParams.entries())),
      );

      pluginUIMessageHandler.sendMessage('close');
    } else {
      window.addEventListener('storage', () => {
        const authConnectorResult = window.localStorage.getItem('authConnectorResult');

        if (!authConnectorResult) {
          return;
        }

        try {
          const value = JSON.parse(authConnectorResult) as Record<string, string>;
          window.localStorage.removeItem('authConnectorResult');
          formMessageHandler.sendMessage('auth_connector_result', value);
        } catch {
          return;
        }
      });
    }
  }, [searchParams]);

  if (searchParams.size > 0) {
    return (
      <Stack alignItems="center" spacing={4} textAlign="center">
        <Typography variant="body1">
          Authenticated successfully.
          <br />
          You can close this window now.
        </Typography>
      </Stack>
    );
  }

  return (
    <>
      <Stack padding={2}>{children}</Stack>
      {!implementsCustomFooter && (
        <Stack direction="row" justifyContent="flex-end" spacing={2} padding={2}>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </Stack>
      )}
      <Stack padding={2}>
        <div>Values:</div>
        <pre style={{ wordBreak: 'break-all', whiteSpace: 'break-spaces' }}>{values || '-'}</pre>
        <div>Errors:</div>
        <pre style={{ wordBreak: 'break-all', whiteSpace: 'break-spaces' }}>{errors || '-'}</pre>
      </Stack>
      <Modal aria-label={lightboxProps?.alt} onClose={handleLightboxClose} open={!!lightboxProps}>
        <Box
          height="100%"
          paddingX={2}
          paddingY={7}
          sx={{ position: 'relative' }}
          width="100%"
          onClick={handleLightboxContainerClick}
        >
          <IconButton
            autoFocus={true}
            onClick={handleLightboxClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
            title="Close"
          >
            <CloseIcon />
          </IconButton>
          <Stack
            alignItems="center"
            height="100%"
            justifyContent="center"
            overflow="auto"
            width="100%"
          >
            {!lightboxProps?.isLoaded && <CircularProgress />}
            <img
              {...lightboxProps}
              data-testid="fullbox-image"
              onLoad={() =>
                setLightboxProps({
                  ...lightboxProps,
                  isLoaded: true,
                } as typeof lightboxProps)
              }
              style={{
                height: 'auto',
                maxHeight: lightboxProps?.isLoaded ? undefined : 0,
                maxWidth: '100%',
              }}
            />
          </Stack>
        </Box>
      </Modal>
      <HotToaster
        containerStyle={{
          bottom: 40,
          left: 40,
          right: 40,
          top: 40,
        }}
        position="bottom-right"
        toastOptions={{
          duration: 6000,
          error: {
            icon: <ErrorIcon />,
            style: {
              background: palette.error.main,
              color: palette.common.white,
            },
          },
          style: {
            backdropFilter: 'blur(6px)',
            background: alpha(palette.neutral[900], 0.8),
            boxShadow: shadows[16],
            color: palette.common.white,
            ...typography.body1,
            maxWidth: 500,
          } as any,
          success: {
            icon: <CheckIcon />,
            style: {
              background: palette.success.main,
              color: palette.common.white,
            },
          },
        }}
      >
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <IconButton
                    onClick={() => toast.dismiss(t.id)}
                    sx={{ color: palette.text.primary }}
                  >
                    <CloseIcon color="inherit" />
                  </IconButton>
                )}
              </>
            )}
          </ToastBar>
        )}
      </HotToaster>
    </>
  );
}

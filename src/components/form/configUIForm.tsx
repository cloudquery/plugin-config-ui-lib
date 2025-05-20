import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { createThemeOptions } from '@cloudquery/cloud-ui';
import { PluginUiMessagePayload } from '@cloudquery/plugin-config-ui-connector';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { FormProvider, Path } from 'react-hook-form';

import { ConfigUIFormHeader } from './header';
import { ComponentsRenderer } from './renderer';
import { usePluginContext } from '../../context/plugin';

import { useConfigUIForm, useFormActions, useFormCurrentValues } from '../../hooks';
import { parseTestConnectionError } from '../../utils/parseTestConnectionError';
import { FormFooter, FormWrapper, GuideComponent, Service } from '../display';
import { PluginTable } from '../inputs';
import { Sections } from './sections/sections';
import { PluginConfig } from '../../types';
import { scrollToFirstFormFieldError } from '../../utils';

const FormStepper = React.lazy(() =>
  import('../display/formStepper').then((module) => ({
    default: module.FormStepper,
  })),
);

/**
 * @public
 */
export interface ConfigUIFormProps {
  prepareSubmitValues: (params: {
    config: PluginConfig;
    values: Record<string, any>;
    tablesList?: PluginTable[];
    servicesList?: Service[];
  }) => PluginUiMessagePayload['validation_passed']['values'];
  container?: HTMLElement | ShadowRoot;
}

/**
 * This component is responsible for rendering the root of the plugin configuration UI.
 *
 * @public
 */
export function ConfigUIForm({ prepareSubmitValues, container }: ConfigUIFormProps) {
  const {
    plugin,
    teamName,
    config,
    hideStepper,
    tablesList,
    servicesList,
    pluginUiMessageHandler,
  } = usePluginContext();

  const formRef = useRef<HTMLFormElement>(null);
  const form = useConfigUIForm();
  const emotionCache = useMemo(() => createCache({ key: 'css', container }), [container]);
  const { getValues, handleSubmit: handleFormSubmit, setValue, watch, setError, formState } = form;

  const step = watch('_step');
  const editMode = watch('_editMode');
  const [submitGuardLoading, setSubmitGuardLoading] = useState(false);

  const getCurrentValues = useCallback(
    () =>
      prepareSubmitValues({
        config,
        values: form.getValues(),
        tablesList,
        servicesList,
      }),
    [config, form, tablesList, servicesList, prepareSubmitValues],
  );

  useFormCurrentValues(pluginUiMessageHandler, getCurrentValues);

  const {
    handleCancelTestConnection,
    handleDelete,
    handleGoToPreviousStep,
    handleTestConnection,
    handleSubmit,
    isSubmitting,
    isTestingConnection,
    testConnectionError,
    submitPayload,
    submitError,
    testConnectionId,
  } = useFormActions({
    getValues: getCurrentValues,
    teamName,
    pluginUiMessageHandler,
    pluginTeamName: plugin.team,
    pluginName: plugin.name,
    pluginKind: plugin.kind as any,
    pluginVersion: plugin.version,
    isUpdating: editMode,
  });

  useEffect(() => {
    if (submitError) {
      const fieldErrors = submitError.data?.field_errors;

      if (fieldErrors) {
        for (const key of Object.keys(fieldErrors)) {
          if (key in getValues()) {
            setError(key as Path<any>, {
              message: fieldErrors[key],
            });
          } else {
            setError('root', {
              message: submitError.data?.message || submitError.message,
            });

            return;
          }
        }
      } else {
        setError('root', {
          message: submitError.data?.message || submitError.message,
        });
      }
    }
  }, [submitError, getValues, setError]);

  const formDisabled = isSubmitting || isTestingConnection || submitGuardLoading;

  const onTestConnectionSuccess = async () => {
    await handleSubmit(getCurrentValues());
  };

  const parsedTestConnectionError = useMemo(
    () => (testConnectionError ? parseTestConnectionError(testConnectionError, config) : undefined),
    [testConnectionError, config],
  );

  const onGoToPreviousStep = () => {
    if (step === 0) {
      handleGoToPreviousStep();
    } else {
      setValue('_step', getValues('_step') - 1);
    }
  };

  const isLastStep = !config.steps || step === config.steps.length - 1;

  const onSubmit = handleFormSubmit(
    async function () {
      const thisStep = getValues('_step');

      if (config.steps[thisStep]?.submitGuard) {
        setSubmitGuardLoading(true);

        const result = await config.steps[thisStep]
          ?.submitGuard(getValues(), teamName, setValue)
          .catch((error) => {
            return {
              errorMessage: error.message || 'Validation failed. Please check the form for errors.',
            };
          });

        setSubmitGuardLoading(false);

        const resultErrorMessage =
          typeof result === 'object' && 'errorMessage' in result && result.errorMessage;
        if (result === false || resultErrorMessage) {
          setError('root', {
            message: resultErrorMessage || 'Validation failed. Please check the form for errors.',
          });

          return;
        }
      }

      if (isLastStep) {
        await handleTestConnection();
      } else {
        setValue('_step', getValues('_step') + 1);
        formRef.current?.scrollIntoView({ block: 'start' });
      }
    },
    (errors) => {
      if (formRef.current) {
        scrollToFirstFormFieldError(Object.keys(errors), formRef.current);
      }
    },
  );

  useEffect(() => {
    if (config?.debug && form?.formState?.errors) {
      // eslint-disable-next-line no-console
      console.warn('Form errors:', form.formState.errors);
    }
  }, [form?.formState?.errors, config?.debug]);

  const theme = useMemo(() => {
    const themeOptions = createThemeOptions();
    themeOptions.components = {
      ...themeOptions.components,
      MuiMenu: {
        ...themeOptions.components?.MuiMenu,
        defaultProps: {
          ...themeOptions.components?.MuiMenu?.defaultProps,
          ...(container ? { container: container as any } : {}),
        },
      },
      MuiPopper: {
        ...themeOptions.components?.MuiPopper,
        defaultProps: {
          ...themeOptions.components?.MuiPopper?.defaultProps,
          ...(container ? { container: container as any } : {}),
        },
      },
      MuiInputLabel: {
        ...themeOptions.components?.MuiInputLabel,
        styleOverrides: {
          ...themeOptions.components?.MuiInputLabel?.styleOverrides,
          root: {
            ...(typeof themeOptions.components?.MuiInputLabel?.styleOverrides?.root === 'object'
              ? themeOptions.components?.MuiInputLabel?.styleOverrides?.root
              : {}),
            top: '-4px',
          },
        },
      },
    };

    return createTheme(themeOptions);
  }, [container]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <FormProvider {...form}>
          {!hideStepper && config.steps?.length > 1 && (
            <Box marginBottom={3}>
              <FormStepper steps={config.steps.map(({ title }) => title)} activeIndex={step} />
            </Box>
          )}
          <Stack direction="row" spacing={5} alignItems="flex-start">
            <Box
              sx={{
                flex: '1 1 0',
                minWidth: 435,
                position: 'relative',
                zIndex: 2,
              }}
            >
              <form ref={formRef} autoComplete="off" noValidate={true} onSubmit={onSubmit}>
                <Stack
                  sx={{
                    gap: 3,
                  }}
                >
                  <FormWrapper formDisabled={formDisabled}>
                    <Sections>
                      <ConfigUIFormHeader />
                      {config.steps?.map(({ children }, index) => {
                        return (
                          step === index && (
                            <Sections key={index}>
                              {children.map((section, index) => (
                                <ComponentsRenderer
                                  section={section}
                                  key={index}
                                  container={container}
                                />
                              ))}
                            </Sections>
                          )
                        );
                      })}
                      <FormHelperText sx={{ textAlign: 'right' }} error={true}>
                        {formState.errors.root?.message}
                      </FormHelperText>
                    </Sections>
                  </FormWrapper>
                  <FormFooter
                    isUpdating={editMode}
                    pluginKind={plugin.kind as any}
                    isTestingConnection={isTestingConnection}
                    isSubmitting={isSubmitting || submitGuardLoading}
                    testConnectionError={parsedTestConnectionError}
                    submitPayload={submitPayload}
                    onCancelTestConnection={handleCancelTestConnection}
                    onTestConnectionSuccess={onTestConnectionSuccess}
                    onDelete={handleDelete}
                    onGoToPreviousStep={onGoToPreviousStep}
                    submitLabel={isLastStep ? undefined : 'Continue'}
                    showPreviousStepButton={!editMode || step !== 0}
                    pluginName={plugin.name}
                    teamName={teamName}
                    testConnectionId={testConnectionId}
                  />
                </Stack>
              </form>
            </Box>
            {config.guide && (
              <Box
                sx={{
                  width: {
                    xs: 360,
                    lg: `calc(50% - (${theme.spacing(5)} / 2))`,
                    xl: '500px',
                    xxl: '40%',
                  },
                  minWidth: 360,
                  position: 'sticky',
                  top: 10,
                }}
              >
                <GuideComponent />
              </Box>
            )}
          </Stack>
        </FormProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

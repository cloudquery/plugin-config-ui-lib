import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { createThemeOptions } from '@cloudquery/cloud-ui';
import { PluginUiMessagePayload } from '@cloudquery/plugin-config-ui-connector';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import createTheme from '@mui/material/styles/createTheme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';

import { FormProvider, Path } from 'react-hook-form';

import { ConfigUIFormHeader } from './header';
import { ComponentsRenderer } from './renderer';
import { usePluginContext } from '../../context/plugin';

import {
  useApiCall,
  useConfigUIForm,
  useFormActions,
  useFormCurrentValues,
  useFormHeightChange,
} from '../../hooks';
import { parseTestConnectionError } from '../../utils/parseTestConnectionError';
import { FormFooter, FormWrapper, GuideComponent } from '../display';
import { PluginTable } from '../inputs';
import { Sections } from './sections/sections';
import { PluginConfig } from '../../types';
import { CollapsibleResizableContainer } from '../controls/collapsibleResizableContainer';

const FormStepper = React.lazy(() =>
  import('../display/formStepper').then((module) => ({
    default: module.FormStepper,
  })),
);

/**
 * @public
 */
export interface ConfigUIFormProps {
  prepareSubmitValues: (
    config: PluginConfig,
    values: Record<string, any>,
    tablesList?: PluginTable[],
  ) => PluginUiMessagePayload['validation_passed']['values'];
  container?: HTMLElement;
}

/**
 * This component is responsible for rendering the root of the plugin configuration UI.
 *
 * @public
 */
export function ConfigUIForm({ prepareSubmitValues, container }: ConfigUIFormProps) {
  const { plugin, teamName, config, hideStepper, tablesList, pluginUiMessageHandler } =
    usePluginContext();

  useFormHeightChange(pluginUiMessageHandler);

  const form = useConfigUIForm();
  const emotionCache = useMemo(() => createCache({ key: 'css', container }), [container]);
  const { getValues, handleSubmit: handleFormSubmit, setValue, watch, setError, formState } = form;

  const step = watch('_step');
  const editMode = watch('_editMode');
  const { callApi } = useApiCall(pluginUiMessageHandler);
  const [submitGuardLoading, setSubmitGuardLoading] = useState(false);

  const getCurrentValues = useCallback(
    () => prepareSubmitValues(config, form.getValues(), tablesList),
    [config, form, tablesList, prepareSubmitValues],
  );

  useFormCurrentValues(pluginUiMessageHandler, getCurrentValues);

  const {
    handleCancel,
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

  const onSubmit = handleFormSubmit(async function () {
    const thisStep = getValues('_step');

    if (config.steps[thisStep]?.submitGuard) {
      setSubmitGuardLoading(true);

      const result = await config.steps[thisStep]
        ?.submitGuard(getValues(), teamName, callApi, setValue)
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
    }
  });

  useEffect(() => {
    if (config?.debug && form?.formState?.errors) {
      // eslint-disable-next-line no-console
      console.warn('Form errors:', form.formState.errors);
    }
  }, [form?.formState?.errors, config?.debug]);

  const theme = useMemo(() => createTheme(createThemeOptions()), []);

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
          <Stack direction="row" spacing={3}>
            <Box
              sx={{
                flex: '1 1 0',
                minWidth: 0,
              }}
            >
              <form autoComplete="off" noValidate={true} onSubmit={onSubmit}>
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
                                <ComponentsRenderer section={section} key={index} />
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
                    onCancel={handleCancel}
                    onCancelTestConnection={handleCancelTestConnection}
                    onTestConnectionSuccess={onTestConnectionSuccess}
                    onDelete={handleDelete}
                    onGoToPreviousStep={onGoToPreviousStep}
                    submitLabel={isLastStep ? undefined : 'Continue'}
                    showPreviousStepButton={!editMode || step !== 0}
                  />
                </Stack>
              </form>
            </Box>
            <CollapsibleResizableContainer
              collapsible={true}
              minWidth={360}
              width={500}
              maxWidth={500}
              togglePosition="left"
            >
              <GuideComponent pluginUiMessageHandler={pluginUiMessageHandler} />
            </CollapsibleResizableContainer>
          </Stack>
        </FormProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

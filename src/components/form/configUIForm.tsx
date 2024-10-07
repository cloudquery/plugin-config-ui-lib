import React, { useCallback, useEffect, useMemo } from 'react';

import { createThemeOptions } from '@cloudquery/cloud-ui';
import { PluginUiMessagePayload } from '@cloudquery/plugin-config-ui-connector';

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
}

/**
 * This component is responsible for rendering the root of the plugin configuration UI.
 *
 * @public
 */
export function ConfigUIForm({ prepareSubmitValues }: ConfigUIFormProps) {
  const { plugin, teamName, config, hideStepper, tablesList, pluginUiMessageHandler } =
    usePluginContext();

  useFormHeightChange(pluginUiMessageHandler);

  const form = useConfigUIForm();
  const { getValues, handleSubmit: handleFormSubmit, setValue, watch, setError, formState } = form;

  const step = watch('_step');
  const editMode = watch('_editMode');
  const { callApi } = useApiCall(pluginUiMessageHandler);

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

  const formDisabled = isSubmitting || isTestingConnection;

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
      const result = await config.steps[thisStep]?.submitGuard(getValues(), callApi);
      const resultError = typeof result === 'object' && 'error' in result && result.error;
      if (result === false || resultError) {
        setError('root', {
          message: resultError || 'Validation failed. Please check the form for errors.',
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormProvider {...form}>
        <Stack
          direction="row"
          sx={{
            gap: 3,
            flexWrap: 'wrap',
          }}
        >
          <Box
            sx={{
              flex: '1 1 0',
              minWidth: 480,
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
                    {!hideStepper && config.steps?.length > 1 && (
                      <FormStepper
                        steps={config.steps.map(({ title }) => title)}
                        activeIndex={step}
                      />
                    )}
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
                  isSubmitting={isSubmitting}
                  testConnectionError={parsedTestConnectionError}
                  submitPayload={submitPayload}
                  onCancel={handleCancel}
                  onCancelTestConnection={handleCancelTestConnection}
                  onTestConnectionSuccess={onTestConnectionSuccess}
                  onDelete={handleDelete}
                  onGoToPreviousStep={onGoToPreviousStep}
                  submitLabel={isLastStep ? undefined : 'Continue'}
                />
              </Stack>
            </form>
          </Box>
          <Box sx={{ width: 360, minWidth: 360 }}>
            <GuideComponent pluginUiMessageHandler={pluginUiMessageHandler} />
          </Box>
        </Stack>
      </FormProvider>
    </ThemeProvider>
  );
}

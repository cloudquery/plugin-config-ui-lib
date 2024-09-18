import { useCallback, useEffect, useMemo } from 'react';

import { PluginUiMessagePayload } from '@cloudquery/plugin-config-ui-connector';
import { Box, Stack } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';

import { FormProvider, Path } from 'react-hook-form';

import {
  FormFooter,
  FormStepper,
  FormWrapper,
  GuideComponent,
  Header,
  PluginTable,
  Sections,
  useFormActions,
  useFormCurrentValues,
  useFormHeightChange,
} from '../..';
import { ComponentsRenderer } from '../../components/display/renderer/Renderer';
import { usePluginContext } from '../../context/plugin';

import { parseTestConnectionError } from '../../utils/parseTestConnectionError';
import { useConfigUIForm } from '../hooks/useConfigUIForm';

/**
 * @public
 */
export interface ConfigUIFormProps {
  prepareSubmitValues: (
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

  const getCurrentValues = useCallback(
    () => prepareSubmitValues(form.getValues(), tablesList),
    [form, tablesList, prepareSubmitValues],
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
            setError('root', { message: submitError.data?.message || submitError.message });

            return;
          }
        }
      } else {
        setError('root', { message: submitError.data?.message || submitError.message });
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
    if (isLastStep) {
      await handleTestConnection();
    } else {
      setValue('_step', getValues('_step') + 1);
    }
  });

  useEffect(() => {
    if (config?.debug && form?.formState?.errors) {
      console.warn('Form errors: ', form.formState.errors);
    }
  }, [form?.formState?.errors, config?.debug]);

  return (
    <FormProvider {...form}>
      <Stack direction="row" gap={3} flexWrap="wrap">
        <Box flex="1 1 0" minWidth={480}>
          <form autoComplete="off" noValidate={true} onSubmit={onSubmit}>
            <Stack gap={3}>
              <FormWrapper formDisabled={formDisabled}>
                <Sections>
                  {!hideStepper && config.steps?.length > 1 && (
                    <FormStepper
                      steps={config.steps.map(({ title }) => title)}
                      activeIndex={step}
                    />
                  )}
                  <Header />
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
  );
}

import { useEffect, useMemo, useState } from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';

import {
  FormFooter,
  FormStepper,
  FormWrapper,
  Header,
  Sections,
  useFormActions,
  useFormContext,
  useFormCurrentValues,
} from '../..';
import { ComponentsRenderer } from '../../components/display/renderer/Renderer';
import { usePluginContext } from '../../context/plugin';

import { parseTestConnectionError } from '../../utils/parseTestConnectionError';

/**
 * @public
 */
export interface ConfigUIFormProps {
  getCurrentValues: any;
  pluginUiMessageHandler: any;
}

/**
 * This component is responsible for rendering the root of the plugin configuration UI.
 *
 * @public
 */
export function ConfigUIForm({ getCurrentValues, pluginUiMessageHandler }: ConfigUIFormProps) {
  const {
    getValues,
    handleSubmit: handleFormSubmit,
    setValue,
    watch,
    formState,
  } = useFormContext();
  const { plugin, teamName, config, hideStepper } = usePluginContext();
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | undefined>(undefined);

  const step = watch('_step');
  const editMode = watch('_editMode');

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
    setSubmitErrorMessage(submitError?.message);
  }, [submitError]);

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

  return (
    <form autoComplete="off" noValidate={true} onSubmit={onSubmit}>
      <Stack gap={3}>
        <FormWrapper formDisabled={formDisabled}>
          <Sections>
            {!hideStepper && config.steps?.length > 1 && (
              <FormStepper steps={config.steps.map(({ title }) => title)} activeIndex={step} />
            )}
            <Header />
            {config.steps?.map(({ sections }, index) => {
              return (
                step === index && (
                  <Sections key={index}>
                    {sections.map((section, index) => (
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
        {submitErrorMessage && (
          <Alert color="error" severity="error" variant="filled">
            <AlertTitle>Submission error</AlertTitle>
            {submitErrorMessage.charAt(0).toUpperCase() + submitErrorMessage.slice(1)}
          </Alert>
        )}
      </Stack>
    </form>
  );
}

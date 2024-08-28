import { useContext } from 'react';
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
import { PluginContext } from '../../context/plugin';

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
  const { getValues, handleSubmit: handleFormSubmit, setValue, watch } = useFormContext();
  const { plugin, teamName, config, hideStepper } = useContext(PluginContext);

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

  const formDisabled = isSubmitting || isTestingConnection;

  const onTestConnectionSuccess = async () => {
    await handleSubmit(getCurrentValues());
  };

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
          <FormFooter
            isUpdating={editMode}
            pluginKind={plugin.kind as any}
            isTestingConnection={isTestingConnection}
            isSubmitting={isSubmitting}
            testConnectionError={testConnectionError}
            submitPayload={submitPayload}
            onCancel={handleCancel}
            onCancelTestConnection={handleCancelTestConnection}
            onTestConnectionSuccess={onTestConnectionSuccess}
            onDelete={handleDelete}
            onGoToPreviousStep={onGoToPreviousStep}
            submitLabel={isLastStep ? undefined : 'Continue'}
          />
        </Sections>
      </FormWrapper>
    </form>
  );
}

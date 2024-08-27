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
import { PluginConfig } from '../../types';

/**
 * @public
 */
export interface ConfigUIFormProps {
  config: PluginConfig;
  getCurrentValues: any;
  hideStepper?: boolean; // TODO: remove after iframe deprecation
  pluginUiMessageHandler: any;
}

/**
 * This component is responsible for rendering the root of the plugin configuration UI.
 *
 * @public
 */
export function ConfigUIForm({
  hideStepper,
  getCurrentValues,
  config,
  pluginUiMessageHandler,
}: ConfigUIFormProps) {
  const { getValues, handleSubmit: handleFormSubmit, setValue, watch } = useFormContext();

  const step = watch('_step');
  const editMode = watch('_editMode');
  const plugin = watch('_plugin');
  const teamName = watch('_teamName');

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
    console.log({ getValues: getValues() });
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
          <Header config={config} />
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

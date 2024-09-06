import { LayoutComponent, RenderSection } from '../../components/display/renderer/types';
import { PluginConfig } from '../../types';
import { reservedNames } from './constants';
import { errorMessages } from './constants';

function checkForDuplicateNames(names: string[]): string[] {
  return names.filter((e, i, a) => a.indexOf(e) !== i);
}

function validateSections(section: RenderSection | LayoutComponent): string[] {
  const componentNameCollector = [];
  if (!section.component) {
    throw new Error(errorMessages.no_component);
  }
  if (section.component.includes('section')) {
    const renderSection = section as RenderSection;
    if (!renderSection.title) {
      throw new Error(errorMessages.no_title);
    }
    if (!renderSection.children) {
      throw new Error(errorMessages.no_children);
    }
    componentNameCollector.push(
      renderSection.children.map((child) => validateSections(child as RenderSection)).flat(),
    );
  }
  if (section.component.includes('control')) {
    const layoutComponent = section as LayoutComponent;
    if (!layoutComponent.name) {
      throw new Error(errorMessages.no_name);
    }
    if (reservedNames.includes(layoutComponent.name)) {
      throw new Error(`${errorMessages.reserved_name}: ${layoutComponent.name}`);
    }
    componentNameCollector.push(layoutComponent.name);
    if (layoutComponent.component !== 'control-exclusive-toggle' && !layoutComponent.label) {
      throw new Error(errorMessages.no_label);
    }
    if (
      !['control-table-selector'].includes(layoutComponent.component) &&
      !layoutComponent.schema
    ) {
      throw new Error(errorMessages.no_schema);
    }
  }
  return componentNameCollector.flat();
}

function validateSteps(steps: PluginConfig['steps']): string[] {
  if (!Array.isArray(steps)) {
    throw new Error(errorMessages.config_no_steps);
  }

  return steps
    .map((step) => {
      if (!step.children || !Array.isArray(step.children)) {
        throw new Error(errorMessages.config_no_steps);
      }
      return step.children.map((child) => validateSections(child as RenderSection)).flat();
    })
    .flat();
}

export function validateConfig(config: PluginConfig) {
  if (!config) {
    throw new Error(errorMessages.config_no_config);
  }
  if (!config.name) {
    throw new Error(errorMessages.config_no_name);
  }
  if (!['source', 'destination'].includes(config.type)) {
    throw new Error(errorMessages.config_no_type);
  }
  if (!config.label) {
    throw new Error(errorMessages.config_no_label);
  }
  if (!config.docsLink) {
    throw new Error(errorMessages.config_no_docs);
  }
  if (!config.iconLink) {
    throw new Error(errorMessages.config_no_icon);
  }
  if (!config.steps) {
    throw new Error(errorMessages.config_no_steps);
  }

  if (config.stateSchema) {
    if (typeof config.stateSchema !== 'object') {
      throw new Error(errorMessages.config_bad_state_schema);
    }
  }
  if (!config.auth) {
    throw new Error(errorMessages.config_no_auth);
  }
  if (!config.guide) {
    throw new Error(errorMessages.config_no_guide);
  }
  if (config.errorCodes) {
    if (typeof config.errorCodes !== 'object') {
      throw new Error(errorMessages.config_bad_error_codes);
    }
  }

  const componentFieldNames = validateSteps(config.steps);
  const duplicateComponentNames = checkForDuplicateNames(componentFieldNames);
  if (duplicateComponentNames.length > 0) {
    throw new Error(`${errorMessages.duplicate_names}: ${duplicateComponentNames}`);
  }
  return config;
}

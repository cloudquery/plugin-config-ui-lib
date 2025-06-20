import { reservedNames, errorMessages } from './constants';
import { PluginTable, Service } from '../../components';
import {
  IterableStepComponent,
  LayoutComponent,
  LayoutTextField,
  RenderSection,
  ReservedLayoutComponent,
} from '../../components/form/renderer/types';
import { PluginConfig } from '../../types';

const sectionRequiresTitle = (componentName: string) =>
  ['collapsible-section', 'section'].includes(componentName);

const isReservedLayoutComponent = (componentName: string) =>
  ['control-table-selector', 'control-oauth', 'control-services-selector'].includes(componentName);

const componentRequiresLabel = (componentName: string) =>
  !['control-exclusive-toggle', 'control-services-selector', 'control-code-field'].includes(
    componentName,
  );

function checkForDuplicateNames(names: string[]): string[] {
  return names.filter((e, i, a) => a.indexOf(e) !== i);
}

function validateSections(section: IterableStepComponent): string[] {
  const componentNameCollector: string[] = [];
  if (typeof section === 'function') {
    return [];
  }

  if (!section.component) {
    throw new Error(errorMessages.no_component);
  }
  if (typeof section.component === 'function') {
    return [];
  }
  if (section.component.includes('section')) {
    const renderSection = section as RenderSection;
    if (sectionRequiresTitle(section.component) && !renderSection.title) {
      throw new Error(`${errorMessages.no_title}: ${JSON.stringify(renderSection)}`);
    }
    if (!renderSection.children) {
      throw new Error(`${errorMessages.no_children}: ${JSON.stringify(renderSection)}`);
    }
    componentNameCollector.push(
      ...renderSection.children.flatMap((child) => validateSections(child as RenderSection)),
    );
  }
  if (section.component.includes('control') && !isReservedLayoutComponent(section.component)) {
    const layoutComponent = section as LayoutComponent;
    if (!layoutComponent.name) {
      throw new Error(`${errorMessages.no_name}: ${JSON.stringify(layoutComponent)}`);
    }
    if (reservedNames.includes(layoutComponent.name)) {
      throw new Error(`${errorMessages.reserved_name}: ${layoutComponent.name}`);
    }
    componentNameCollector.push(layoutComponent.name);
    if (
      componentRequiresLabel(layoutComponent.component) &&
      !(layoutComponent as LayoutTextField).label
    ) {
      throw new Error(`${errorMessages.no_label}: ${JSON.stringify(layoutComponent)}`);
    }
    if (!layoutComponent.schema) {
      throw new Error(`${errorMessages.no_schema}: ${JSON.stringify(layoutComponent)}`);
    }
  }

  return componentNameCollector.flat();
}

function validateSteps(steps: PluginConfig['steps']): string[] {
  if (!Array.isArray(steps)) {
    throw new TypeError(errorMessages.config_no_steps);
  }

  return steps.flatMap((step, index) => {
    if (!step.children || !Array.isArray(step.children)) {
      throw new Error(`${errorMessages.no_children}: Step ${index}`);
    }

    return step.children.flatMap((child) => validateSections(child as RenderSection));
  });
}

export function validateConfig(
  config: PluginConfig,
  tablesList?: PluginTable[],
  servicesList?: Service[],
) {
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

  if (config.stateSchema && typeof config.stateSchema !== 'object') {
    throw new Error(errorMessages.config_bad_state_schema);
  }
  if (!config.auth) {
    throw new Error(errorMessages.config_no_auth);
  }
  if (config.errorCodes && typeof config.errorCodes !== 'object') {
    throw new Error(errorMessages.config_bad_error_codes);
  }

  const componentFieldNames = validateSteps(config.steps);
  const duplicateComponentNames = checkForDuplicateNames(componentFieldNames);
  if (duplicateComponentNames.length > 0) {
    throw new Error(`${errorMessages.duplicate_names}: ${duplicateComponentNames}`);
  }

  if (tablesList && tablesList.length > 0 && servicesList && servicesList.length > 0) {
    throw new Error(errorMessages.config_both_table_and_service_selector);
  }

  if (tablesList && tablesList.length > 0) {
    const hasTableSelector = (
      steps: (RenderSection | LayoutComponent | ReservedLayoutComponent)[],
    ): boolean => {
      return steps.some((step) => {
        if (step.component === 'control-table-selector') {
          return true;
        }
        if ((step as RenderSection).children && Array.isArray((step as RenderSection).children)) {
          return hasTableSelector(
            (step as RenderSection).children as (
              | RenderSection
              | LayoutComponent
              | ReservedLayoutComponent
            )[],
          );
        }

        return false;
      });
    };

    if (
      !hasTableSelector(
        config.steps as (RenderSection | LayoutComponent | ReservedLayoutComponent)[],
      )
    ) {
      throw new Error(errorMessages.config_no_table_selector);
    }
  }

  if (servicesList && servicesList.length > 0) {
    const hasServiceSelector = (
      steps: (RenderSection | LayoutComponent | ReservedLayoutComponent)[],
    ): boolean => {
      return steps.some((step) => {
        if (step.component === 'control-services-selector') {
          return true;
        }
        if ((step as RenderSection).children && Array.isArray((step as RenderSection).children)) {
          return hasServiceSelector(
            (step as RenderSection).children as (
              | RenderSection
              | LayoutComponent
              | ReservedLayoutComponent
            )[],
          );
        }

        return false;
      });
    };

    if (
      !hasServiceSelector(
        config.steps as (RenderSection | LayoutComponent | ReservedLayoutComponent)[],
      )
    ) {
      throw new Error(errorMessages.config_no_service_selector);
    }
  }

  return config;
}

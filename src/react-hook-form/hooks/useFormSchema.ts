import { useMemo } from 'react';

import * as yup from 'yup';

import { LayoutComponent, RenderSection } from '../../components/display/renderer/types';
import { usePluginContext } from '../../context';
import { useCoreFormSchema } from '../../hooks';

import { PluginConfig } from '../../types';

const findComponents = (children: (RenderSection | LayoutComponent)[]): LayoutComponent[] => {
  let result: LayoutComponent[] = [];

  for (const section of children) {
    if (section.component) {
      result.push(section as LayoutComponent);
    }
    if ((section as RenderSection).children) {
      result = [
        ...result,
        ...findComponents((section as RenderSection).children as RenderSection[]),
      ];
    }
  }

  return result;
};

const getSchema = (componentsArray: LayoutComponent[], config: PluginConfig) => {
  const schemaFields: {
    fields: Record<string, yup.AnySchema>;
    secretFields: Record<string, yup.AnySchema>;
  } = {
    fields: config?.stateSchema ?? {},
    secretFields: {},
  };

  for (const component of componentsArray) {
    if (component.schema) {
      if (component.component === 'control-secret-field') {
        schemaFields.secretFields[component.name] = component.schema;
      } else {
        schemaFields.fields[component.name] = component.schema;
      }
    }
  }

  return schemaFields;
};

export const useFormSchema = (): yup.AnyObjectSchema => {
  const { initialValues, config } = usePluginContext();

  const formFields = useMemo(() => {
    const componentsArray = findComponents(config.steps as RenderSection[]);

    return getSchema(componentsArray, config);
  }, [config]);

  const coreSchema = useCoreFormSchema({
    initialValues,
    ...formFields,
  });

  return coreSchema;
};

/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */

import { useMemo } from 'react';

import * as yup from 'yup';

import { usePluginContext } from '../../context';
import { useCoreFormSchema } from '../../hooks';

import { PluginConfig } from '../../types';

const findComponents = (sections: any[]): any[] => {
  let result: any[] = [];

  for (const section of sections) {
    if (section.component) {
      result.push(section);
    }
    if (section.children || section.sections) {
      result = result.concat(findComponents(section.children ?? section.sections));
    }
  }

  return result;
};

const getSchema = (componentsArray: any[], config: PluginConfig) => {
  const { fields, secretFields } = componentsArray.reduce(
    (acc, next) => {
      if (!next.schema) {
        return acc;
      } else if (next.component === 'control-secret-field') {
        acc.secretFields[next.name] = next.schema;
      } else {
        acc.fields[next.name] = next.schema;
      }

      return acc;
    },
    {
      fields: config?.stateSchema ?? {},
      secretFields: {},
    },
  );

  return {
    fields,
    secretFields,
  };
};

export const useFormSchema = (): yup.AnyObjectSchema => {
  const { initialValues, config } = usePluginContext();

  const formFields = useMemo(() => {
    const componentsArray = findComponents(config.steps);

    return getSchema(componentsArray, config);
  }, [config]);

  const coreSchema = useCoreFormSchema({
    initialValues,
    ...formFields,
  });

  return coreSchema;
};

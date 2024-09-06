import { useMemo } from 'react';
import { useCoreFormSchema } from '../../hooks';
import { usePluginContext } from '../../context';

import * as yup from 'yup';

const findComponents = (sections: any[]): any[] => {
  let result: any[] = [];

  sections.forEach((section) => {
    if (section.component) {
      result.push(section);
    }
    if (section.children || section.sections) {
      result = result.concat(findComponents(section.children ?? section.sections));
    }
  });

  return result;
};

const getSchema = (componentsArray: any[]) => {
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
      // todo: statefields
    },
    {
      fields: {},
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
    return getSchema(componentsArray);
  }, [config]);

  const coreSchema = useCoreFormSchema({
    initialValues,
    ...formFields,
  });

  console.log({ initialValues, config, formFields, coreSchema });
  return coreSchema;
};

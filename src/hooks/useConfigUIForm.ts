import { useEffect, useMemo } from 'react';

import { useForm } from 'react-hook-form';

import { useFormSchema } from './useFormSchema';
import { usePluginContext } from '../context';
import { getYupValidationResolver } from '../utils';

/**
 * @public
 */
export const useConfigUIForm = () => {
  const formValidationSchema = useFormSchema();
  const { tablesList, servicesList } = usePluginContext();
  const { formValidationResolver, defaultValues } = useMemo(
    () => ({
      formValidationResolver: getYupValidationResolver(formValidationSchema),
      defaultValues: formValidationSchema.getDefault(),
    }),
    [formValidationSchema],
  );

  const form = useForm({
    defaultValues,
    resolver: formValidationResolver,
  });

  // Because list of tables and services is loaded asynchronously,
  // we need to update the form values when they are loaded
  useEffect(() => {
    form.setValue('tables', defaultValues.tables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablesList, servicesList]);

  return form;
};

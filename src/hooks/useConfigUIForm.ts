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
  const { tablesList } = usePluginContext();
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

  useEffect(() => {
    form.setValue('tables', defaultValues.tables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablesList]);

  return form;
};

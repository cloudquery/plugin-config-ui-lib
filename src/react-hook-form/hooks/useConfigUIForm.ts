import { useMemo } from 'react';

import { useForm } from 'react-hook-form';

import { useFormSchema } from './useFormSchema';
import { getYupValidationResolver } from '../../utils/getYupValidationResolver';

export const useConfigUIForm = () => {
  const formValidationSchema = useFormSchema();
  const { formValidationResolver, defaultValues } = useMemo(
    () => ({
      formValidationResolver: getYupValidationResolver(formValidationSchema),
      defaultValues: formValidationSchema.getDefault(),
    }),
    [formValidationSchema],
  );

  const form = useForm({
    defaultValues,
    values: defaultValues,
    resolver: formValidationResolver,
  });

  return form;
};

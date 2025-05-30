import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { CodeSnippet } from '../../components/display/codeSnippet';
import { ComponentsRenderer } from '../../components/form/renderer';
import { theme } from '../../utils/tests/renderWithTheme';

export const ComponentWrapper = ({
  args,
  yupBase = 'string()',
  defaultValues,
}: {
  yupBase?: string;
  args: any;
  defaultValues?: any;
}) => {
  const form = useForm({
    defaultValues,
  });
  let text = JSON.stringify(
    { ...args, shouldRender: '{shouldRender}', schema: '{schema}' },
    undefined,
    4,
  );
  text = text.replace('"{shouldRender}"', '(formValues) => !!formValues.specific_value');
  text = text.replace('"{schema}"', `yup.${yupBase}.default(initialValues?.specific_value ?? "")`);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormProvider {...form}>
        <ComponentsRenderer section={args} />
        <CodeSnippet text={text} />
      </FormProvider>
    </ThemeProvider>
  );
};

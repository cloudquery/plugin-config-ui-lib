import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { CodeSnippet } from '../../components/display/setupGuide/section/codeSnippet';
import { ComponentsRenderer } from '../../components/form/renderer';
import { theme } from '../../utils/tests/renderWithTheme';

export const LayoutWrapper = ({ args }: { args: any }) => {
  const form = useForm();
  let text = JSON.stringify({ ...args, shouldRender: '{shouldRender}' }, undefined, 4);
  text = text.replace('"{shouldRender}"', '(formValues) => !!formValues.specific_value');

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

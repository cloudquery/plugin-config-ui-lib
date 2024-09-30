import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { CodeSnippet } from '../../components/display/setupGuide/section/codeSnippet';
import { ComponentsRenderer } from '../../components/form/renderer';
import { theme } from '../../utils/tests/renderWithTheme';

export const ComponentWrapper = ({ args }) => {
  const form = useForm();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FormProvider {...form}>
        <ComponentsRenderer section={args} />
        <CodeSnippet text={JSON.stringify(args)} />
      </FormProvider>
    </ThemeProvider>
  );
};

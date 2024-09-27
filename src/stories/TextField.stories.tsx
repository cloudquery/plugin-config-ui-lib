import type { Meta, StoryObj } from '@storybook/react';

import { ComponentsRenderer } from '../components/form/renderer/index.js';
import { FormProvider } from '../components/index.js';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { theme } from '../utils/tests/renderWithTheme.js';
import { useForm } from 'react-hook-form';
import { LayoutTextField } from '../components/form/renderer/types.js';
import { ControlTextField } from '../components/form/controls/controlTextField.js';
import { CodeSnippet } from '../components/display/setupGuide/section/codeSnippet';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/TextField',
  component: ControlTextField,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    component: {
      control: 'select',
      options: ['control-text-field'],
    },
  },
  // // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    // onClick: fn()
    component: 'control-text-field',
    helperText: 'Name of the DataDog Account.',
    name: 'account_name',
    label: 'DataDog Account Name',
  },
  // TODO: need this to show schema and shouldrender too
} satisfies Meta<LayoutTextField>;

export default meta;
type Story = StoryObj<typeof meta>;

// TODO: make storywrapper here
// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  render: (args) => {
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
  },
  args: {
    // section: {
    //   component: 'control-text-field',
    //   helperText: 'Name of the DataDog Account.',
    //   name: 'account_name',
    //   label: 'DataDog Account Name',
    //   // shouldRender: (values: any) => values._authType === AuthType.OTHER,
    //   // schema: yup
    //   //   .string()
    //   //   .when('_authType', {
    //   //     is: (authType: AuthType) => authType === AuthType.OTHER,
    //   //     // eslint-disable-next-line unicorn/no-thenable
    //   //     then: (schema: any) => schema.trim().required(),
    //   //   })
    //   //   .default(initialValues?.spec?.accounts[0]?.name ?? ''),
    // },
  },
};

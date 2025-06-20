import { Stack } from '@mui/material';

import { ControlCodeField } from '../../components/form/controls/controlCodeField.js';
import { LayoutCodeField } from '../../components/form/renderer/types.js';
import { ComponentWrapper } from '../wrappers/component.js';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Components/CodeField',
  component: ControlCodeField,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    component: {
      control: 'select',
      options: ['control-code-field'],
    },
  },
  args: {
    component: 'control-code-field',
    name: 'option',
    label: 'Code Field',
    helperText: 'This is a helper text',
  },
} satisfies Meta<LayoutCodeField>;

export default meta;

export const Primary = {
  render: (args) => (
    <ComponentWrapper args={args} yupBase="string().default(initialValues?.spec?.yaml  || '')" />
  ),
  args: {},
};

export const WithoutLabel = {
  render: () => (
    <Stack>
      <ComponentWrapper
        args={{
          component: 'control-code-field',
          name: 'option',
        }}
        yupBase="string().default(initialValues?.spec?.yaml  || '')"
      />
    </Stack>
  ),
  args: {},
};

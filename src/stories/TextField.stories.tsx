import type { Meta } from '@storybook/react';

import { LayoutTextField } from '../components/form/renderer/types.js';
import { ControlTextField } from '../components/form/controls/controlTextField.js';
import { ComponentWrapper } from './wrappers/component.js';

const meta = {
  title: 'StepComponents/TextField',
  component: ControlTextField,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    component: {
      control: 'select',
      options: ['control-text-field'],
    },
  },
  args: {
    component: 'control-text-field',
    helperText: 'Name of the DataDog Account.',
    name: 'account_name',
    label: 'DataDog Account Name',
  },
} satisfies Meta<LayoutTextField>;

export default meta;

export const Primary = {
  render: (args) => <ComponentWrapper args={args} />,
  args: {},
};

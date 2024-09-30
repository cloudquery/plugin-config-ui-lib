import type { Meta } from '@storybook/react';

import { LayoutBooleanField } from '../components/form/renderer/types.js';
import { ControlBooleanField } from '../components/form/controls/controlBooleanField.js';
import { ComponentWrapper } from './wrappers/component.js';

const meta = {
  title: 'StepComponents/BooleanField',
  component: ControlBooleanField,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    component: {
      control: 'select',
      options: ['control-boolean-field'],
    },
  },
  args: {
    component: 'control-boolean-field',
    helperText: 'Enable the option.',
    name: 'account_boolean',
    label: 'Account Boolean',
    type: 'toggle',
  },
  // TODO: need this to show schema and shouldrender too
} satisfies Meta<LayoutBooleanField>;

export default meta;

export const Primary = {
  render: (args) => <ComponentWrapper args={args} />,
  args: {},
};

import type { Meta } from '@storybook/react';

import { LayoutNumberField } from '../components/form/renderer/types.js';
import { ControlNumberField } from '../components/form/controls/controlNumberField.js';
import { ComponentWrapper } from './wrappers/component.js';

const meta = {
  title: 'StepComponents/NumberField',
  component: ControlNumberField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    component: {
      control: 'select',
      options: ['control-number-field'],
    },
  },
  args: {
    component: 'control-number-field',
    helperText: 'Amount of thing.',
    name: 'amount',
    label: 'Amount',
  },
} satisfies Meta<LayoutNumberField>;

export default meta;

export const Primary = {
  render: (args) => <ComponentWrapper args={args} />,
  args: {},
};
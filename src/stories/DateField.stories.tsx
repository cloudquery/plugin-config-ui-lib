import type { Meta } from '@storybook/react';

import { LayoutDateField } from '../components/form/renderer/types.js';
import { ControlDateField } from '../components/form/controls/controlDateField.js';
import { ComponentWrapper } from './wrappers/component.js';

const meta = {
  title: 'StepComponents/DateField',
  component: ControlDateField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    component: {
      control: 'select',
      options: ['control-date-field'],
    },
  },
  args: {
    component: 'control-date-field',
    helperText: 'Date to start.',
    name: 'start_date',
    label: 'Start Date',
    disabled: false,
    clearable: true,
  },
} satisfies Meta<LayoutDateField>;

export default meta;

export const Primary = {
  render: (args) => <ComponentWrapper args={args} />,
  args: {},
};

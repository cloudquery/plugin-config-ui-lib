import type { Meta } from '@storybook/react';

import { LayoutDateTimeField } from '../components/form/renderer/types.js';
import { ControlDateTimeField } from '../components/form/controls/controlDateTimeField.js';
import { ComponentWrapper } from './wrappers/component.js';

const meta = {
  title: 'StepComponents/DateTimeField',
  component: ControlDateTimeField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    component: {
      control: 'select',
      options: ['control-date-time-field'],
    },
  },
  args: {
    component: 'control-date-time-field',
    helperText: 'Date to start.',
    name: 'start_date',
    label: 'Start Date',
    disabled: false,
    clearable: true,
  },
} satisfies Meta<LayoutDateTimeField>;

export default meta;

export const Primary = {
  render: (args) => <ComponentWrapper args={args} />,
  args: {},
};

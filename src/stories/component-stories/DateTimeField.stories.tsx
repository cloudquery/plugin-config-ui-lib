import { ControlDateTimeField } from '../../components/form/controls/controlDateTimeField.js';
import { LayoutDateTimeField } from '../../components/form/renderer/types.js';
import { ComponentWrapper } from '../wrappers/component.js';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Components/DateTimeField',
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
  render: (args) => (
    <ComponentWrapper
      args={args}
      yupBase="date().default(initialValues?.spec?.start_time ? new Date(initialValues?.spec?.start_time): null).nullable()"
    />
  ),
  args: {},
};

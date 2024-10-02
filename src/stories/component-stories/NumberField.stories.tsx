import { ControlNumberField } from '../../components/form/controls/controlNumberField.js';
import { LayoutNumberField } from '../../components/form/renderer/types.js';
import { ComponentWrapper } from '../wrappers/component.js';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Components/NumberField',
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
  render: (args) => (
    <ComponentWrapper
      args={args}
      yupBase="number().integer().default(initialValues?.spec?.batch_size ?? 10_000)"
    />
  ),
  args: {},
};

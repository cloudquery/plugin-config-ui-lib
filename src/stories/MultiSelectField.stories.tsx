import type { Meta } from '@storybook/react';

import { LayoutMultiSelectField } from '../components/form/renderer/types.js';
import { ControlMultiSelectField } from '../components/form/controls/controlMultiSelectField.js';
import { ComponentWrapper } from './wrappers/component.js';

const meta = {
  title: 'StepComponents/MultiSelectField',
  component: ControlMultiSelectField,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    component: {
      control: 'select',
      options: ['control-multi-select'],
    },
  },
  args: {
    component: 'control-multi-select',
    helperText: 'Option List',
    name: 'option',
    label: 'Account Option',
  },
} satisfies Meta<LayoutMultiSelectField>;

export default meta;

export const Primary = {
  render: (args) => <ComponentWrapper args={args} />,
  args: {},
};

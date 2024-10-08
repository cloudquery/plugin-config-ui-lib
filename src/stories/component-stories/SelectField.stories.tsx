import { ControlSelectField } from '../../components/form/controls/controlSelectField.js';
import { LayoutSelectField } from '../../components/form/renderer/types.js';
import { ComponentWrapper } from '../wrappers/component.js';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Components/SelectField',
  component: ControlSelectField,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    component: {
      control: 'select',
      options: ['control-select-field'],
    },
  },
  args: {
    component: 'control-select-field',
    helperText: 'Option List',
    name: 'option',
    label: 'Account Option',
    options: [
      {
        value: 0,
        label: 'First Option',
      },
      {
        value: 1,
        label: 'Second Option',
      },
    ],
  },
} satisfies Meta<LayoutSelectField>;

export default meta;

export const Primary = {
  render: (args) => <ComponentWrapper yupBase="string().oneOf([0,1])" args={args} />,
  args: {},
};

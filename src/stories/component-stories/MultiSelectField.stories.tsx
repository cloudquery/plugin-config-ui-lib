import { ControlMultiSelectField } from '../../components/form/controls/controlMultiSelectField.js';
import { LayoutMultiSelectField } from '../../components/form/renderer/types.js';
import { ComponentWrapper } from '../wrappers/component.js';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Components/MultiSelectField',
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
  render: (args) => (
    <ComponentWrapper
      args={args}
      yupBase="array().of(yup.string().required()).default(initialValues?.spec?.services ?? [])"
    />
  ),
  args: {},
};

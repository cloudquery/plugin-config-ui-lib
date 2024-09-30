import type { Meta } from '@storybook/react';

import { LayoutExclusiveToggle } from '../components/form/renderer/types.js';
import { ControlExclusiveToggleField } from '../components/form/controls/controlExclusiveToggleField.js';
import { ComponentWrapper } from './wrappers/component.js';

const meta = {
  title: 'StepComponents/ExclusiveField',
  component: ControlExclusiveToggleField,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    component: {
      control: 'select',
      options: ['control-exclusive-toggle'],
    },
  },
  args: {
    component: 'control-exclusive-toggle',
    name: 'option',
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
} satisfies Meta<LayoutExclusiveToggle>;

export default meta;

export const Primary = {
  render: (args) => (
    <ComponentWrapper
      args={args}
      yupBase="string().oneOf(['orgs', 'repos']).default(initialValues?.spec?.repos ? 'repos' : 'orgs')"
    />
  ),
  args: {},
};

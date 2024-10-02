import { ControlSecretField } from '../../components/form/controls/controlSecretField.js';
import { LayoutSecretInput } from '../../components/form/renderer/types.js';
import { ComponentWrapper } from '../wrappers/component.js';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Components/SecretField',
  component: ControlSecretField,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    component: {
      control: 'select',
      options: ['control-secret-field'],
    },
  },
  args: {
    component: 'control-secret-field',
    helperText: 'Key of the Account.',
    name: 'account_key',
    label: 'Account Key',
  },
} satisfies Meta<LayoutSecretInput>;

export default meta;

export const Primary = {
  render: (args) => <ComponentWrapper args={args} />,
  args: {},
};

import { LayoutSecretInput } from '../../components/form/renderer/types.js';
import { ControlSecretField } from '../../components/index.js';
import { AuthType } from '../../types.js';
import { yup } from '../../utils/getYupValidationResolver.js';

import { ConfigUIFormWrapper } from '../wrappers/configUiForm.js';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Components/SecretField',
  component: ControlSecretField,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    component: {
      control: 'text',
      options: ['control-secret-field'],
    },
  },
  args: {
    component: 'control-secret-field',
    label: 'Secret Field',
    name: 'secret_field',
    helperText: 'This is a helper text',
    textFieldProps: {
      placeholder: 'Enter your secret',
    },
  },
} satisfies Meta<LayoutSecretInput>;

export default meta;

export const Primary = {
  render: ConfigUIFormWrapper,
  args: {
    config: {
      name: 'aws',
      type: 'source',
      label: 'AWS',
      docsLink: ' ',
      iconLink: ' ',
      steps: [
        {
          title: 'Configure',
          children: [
            {
              component: 'control-secret-field',
              name: 'secret_field',
              label: 'Secret Field',
              helperText: 'This is a helper text',
              textFieldProps: {
                placeholder: 'Enter your secret',
              },
              schema: yup.string().default('').required('Secret is required'),
            },
          ],
        },
      ],
      auth: [AuthType.OTHER],
    },
  },
};

export const Multiline = {
  render: ConfigUIFormWrapper,
  args: {
    config: {
      name: 'aws',
      type: 'source',
      label: 'AWS',
      docsLink: ' ',
      iconLink: ' ',
      steps: [
        {
          title: 'Configure',
          children: [
            {
              component: 'control-secret-field',
              name: 'secret_field',
              label: 'Secret Field',
              helperText: 'This is a helper text',
              textFieldProps: {
                placeholder: 'Enter your secret',
                multiline: true,
                rows: 4,
              },
              schema: yup.string().default('').required('Secret is required'),
            },
          ],
        },
      ],
      auth: [AuthType.OTHER],
    },
  },
};

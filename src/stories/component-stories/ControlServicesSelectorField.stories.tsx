import { LayoutServicesSelector } from '../../components/form/renderer/types.js';
import { ControlServicesSelectorField } from '../../components/index.js';
import { AuthType } from '../../types.js';
import { yup } from '../../utils/getYupValidationResolver.js';
import services from '../mocks/services.js';

import { ConfigUIFormWrapper } from '../wrappers/configUiForm.js';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Components/ServiceSelector',
  component: ControlServicesSelectorField,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    component: {
      control: 'select',
      options: ['control-services-selector'],
    },
  },
  args: {
    component: 'control-services-selector',
    helperText: 'Service List',
    name: 'services',
    label: 'Services',
    services,
  },
} satisfies Meta<LayoutServicesSelector>;

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
              component: 'section',
              title: 'Select services',
              subtitle: 'Select services you want to sync your data from.',
              children: [
                {
                  component: 'control-services-selector',
                  services,
                  name: 'services',
                  topServices: ['ec2', 's3', 'elb', 'kms', 'cloudfront', 'route53', 'iam', 'rds'],
                  schema: yup.object().default({}),
                },
              ],
            },
          ],
        },
      ],
      auth: [AuthType.OTHER],
    },
  },
};

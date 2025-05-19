import { LayoutServicesSelector } from '../../components/form/renderer/types.js';
import { ControlServicesSelectorField } from '../../components/index.js';
import { AuthType } from '../../types.js';
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
    topServices: ['ec2', 's3', 'elb', 'kms', 'cloudfront', 'route53', 'iam', 'rds'],
  },
} satisfies Meta<LayoutServicesSelector>;

export default meta;

export const Primary = {
  render: ConfigUIFormWrapper,
  args: {
    initialValues: {
      tables: ['aws_ec2_account_attributes'],
    },
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
              component: 'control-services-selector',
              name: 'services',
              topServices: ['ec2', 's3', 'elb', 'kms', 'cloudfront', 'route53', 'iam', 'rds'],
            },
          ],
        },
      ],
      auth: [AuthType.OTHER],
    },
    getServicesData: async () => ({ default: services }),
  },
};

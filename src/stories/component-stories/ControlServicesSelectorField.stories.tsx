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
    slowTables: [
      'aws_ec2_account_attributes',
      'aws_ec2_byoip_cidrs',
      'aws_ec2_capacity_reservations',
      'aws_ec2_customer_gateways',
      'aws_ec2_dhcp_options',
    ],
    expensiveTables: ['aws_ec2_account_attributes', 'aws_ec2_byoip_cidrs'],
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
              component: 'control-services-selector',
              name: 'services',
              topServices: ['ec2', 's3', 'elb', 'kms', 'cloudfront', 'route53', 'iam', 'rds'],
              slowTables: [
                'aws_ec2_account_attributes',
                'aws_ec2_capacity_reservations',
                'aws_ec2_customer_gateways',
                'aws_ec2_dhcp_options',
              ],
              expensiveTables: ['aws_ec2_account_attributes', 'aws_ec2_byoip_cidrs'],
            },
          ],
        },
      ],
      auth: [AuthType.OTHER],
    },
    getServicesData: async () => ({ default: services }),
  },
};

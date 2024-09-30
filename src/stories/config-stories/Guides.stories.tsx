/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
import { AuthType, SourceConfig } from '../../types.js';

import { ConfigUIFormWrapper } from '../wrappers/configUiForm.js';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Examples/Guides',
  component: (props: SourceConfig) => <></>,
  parameters: {
    layout: 'centered',
  },

  argTypes: {},
  args: {},
} satisfies Meta<SourceConfig>;

export default meta;

// TODO: add shouldrender
export const Primary = {
  render: ConfigUIFormWrapper,
  args: {
    config: {
      name: 'datadog',
      type: 'source',
      label: 'DataDog',
      docsLink: 'https://hub.cloudquery.io/plugins/source/cloudquery/datadog/latest/docs',
      iconLink: 'images/logo.png',
      steps: [],
      auth: [AuthType.OTHER],
      guide: {
        title: 'DataDog configuration',
        sections: [
          {
            title: 'Step 1',
            bodies: [
              {
                text: 'CloudQuery reads information from your DataDog accounts and loads it into any supported CloudQuery destination.',
              },
            ],
          },
        ],
      },
    },
  },
};

// TODO
export const WithReact = {
  render: ConfigUIFormWrapper,
  args: {
    config: {
      name: 'datadog',
      type: 'source',
      label: 'DataDog',
      docsLink: 'https://hub.cloudquery.io/plugins/source/cloudquery/datadog/latest/docs',
      iconLink: 'images/logo.png',
      steps: [],
      auth: [AuthType.OTHER],
      guide: {
        title: 'DataDog configuration',
        sections: [
          {
            title: '',
            bodies: [
              {
                text: 'CloudQuery reads information from your DataDog accounts and loads it into any supported CloudQuery destination.',
              },
            ],
          },
        ],
      },
    },
  },
};

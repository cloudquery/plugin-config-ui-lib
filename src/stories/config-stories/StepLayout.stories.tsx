/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
import { AuthType, SourceConfig } from '../../types.js';

import { ConfigUIFormWrapper } from '../wrappers/configUiForm.js';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Examples/StepLayout',
  component: (props: SourceConfig) => <></>,
  parameters: {
    layout: 'centered',
  },

  argTypes: {},
  args: {},
} satisfies Meta<SourceConfig>;

export default meta;

export const Primary = {
  render: ConfigUIFormWrapper,
  args: {
    config: {
      name: 'datadog',
      type: 'source',
      label: 'DataDog',
      docsLink: 'https://hub.cloudquery.io/plugins/source/cloudquery/datadog/latest/docs',
      iconLink: 'images/logo.png',
      steps: [
        {
          children: [
            {
              component: 'section',
              title: 'Section 1',
              subtitle: `Sections have a visible border, they encapsulate related fields.`,
              children: [
                {
                  component: 'sub-section',
                  title: 'Subsection 1',
                  subtitle:
                    'Subsections do not have a visible border, but create spacing to denote a subset of related fields.',
                  children: [
                    {
                      component: 'control-oauth',
                    },
                  ],
                },
              ],
            },
            {
              component: 'collapsible-section',
              title: 'Collapsible Section 2',
              defaultExpanded: false,
              children: [
                {
                  component: 'sub-section',
                  title: 'Collapsible Subsection 2',
                  defaultExpanded: false,
                  children: [
                    {
                      component: 'control-oauth',
                    },
                  ],
                },
              ],
            },
          ],
          title: 'Sample Configuration Layout',
        },
      ],
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

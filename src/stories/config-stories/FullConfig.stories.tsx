/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
import { AuthType, SourceConfig } from '../../types.js';
import { yup } from '../../utils/getYupValidationResolver.js';

import { ConfigUIFormWrapper } from '../wrappers/configUiForm.js';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Examples/FullConfig',
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
              subtitle: `This is section 1.`,
              children: [
                {
                  component: 'control-exclusive-toggle',
                  name: '_authType',
                  options: [
                    { label: 'OAuth', value: AuthType.OAUTH },
                    {
                      label: 'DataDog API Key',
                      value: AuthType.OTHER,
                    },
                  ],
                  schema: yup.mixed().oneOf(Object.values(AuthType)).default(AuthType.OAUTH),
                },
                {
                  component: 'sub-section',
                  children: [
                    {
                      component: 'control-oauth',
                      shouldRender: (values: any) => values._authType === AuthType.OAUTH,
                    },
                    {
                      component: 'control-text-field',
                      helperText: 'Name of the DataDog Account.',
                      name: 'account_name',
                      label: 'DataDog Account Name',
                      shouldRender: (values: any) => values._authType === AuthType.OTHER,
                      schema: yup
                        .string()
                        .when('_authType', {
                          is: (authType: AuthType) => authType === AuthType.OTHER,
                          // eslint-disable-next-line unicorn/no-thenable
                          then: (schema: any) => schema.trim().required(),
                        })
                        .default(''),
                    },
                    {
                      component: 'control-secret-field',
                      helperText: 'API Key provided by DataDog.',
                      name: 'account_api_key',
                      label: 'DataDog API Key',
                      shouldRender: (values: any) => values._authType === AuthType.OTHER,
                      schema: yup
                        .string()
                        .when('_authType', {
                          is: (authType: AuthType) => authType === AuthType.OTHER,
                          // eslint-disable-next-line unicorn/no-thenable
                          then: (schema: any) => schema.trim().required(),
                        })
                        .default(''),
                    },
                    {
                      component: 'control-secret-field',
                      helperText: 'App Key provided by DataDog.',
                      name: 'account_app_key',
                      label: 'DataDog App Key',
                      shouldRender: (values: any) => values._authType === AuthType.OTHER,
                      schema: yup
                        .string()
                        .when('_authType', {
                          is: (authType: AuthType) => authType === AuthType.OTHER,
                          // eslint-disable-next-line unicorn/no-thenable
                          then: (schema: any) => schema.trim().required(),
                        })
                        .default(''),
                    },
                  ],
                },
              ],
            },
            {
              component: 'section',
              title: 'Tables',
              children: [
                {
                  component: 'control-table-selector',
                },
              ],
            },
            {
              component: 'collapsible-section',
              defaultExpanded: false,
              title: 'Advanced Options',
              children: [
                {
                  component: 'control-number-field',
                  name: 'concurrency',
                  helperText:
                    'The best effort maximum number of Go routines to use. Lower this number to reduce memory usage or to avoid hitting DataDog API rate limits. Defaults to 1000.',
                  label: 'Concurrency',
                  schema: yup.number().nullable().default(1000),
                },
              ],
            },
          ],
          title: 'Configuration',
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

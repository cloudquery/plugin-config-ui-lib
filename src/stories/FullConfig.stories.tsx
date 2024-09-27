import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */

import { Button } from './Button.js';
import { ComponentsRenderer } from '../components/form/renderer/index.js';
import { yup } from '../utils/getYupValidationResolver.js';
import { CloudAppMock } from '../components/utils/cloudAppMock.js';
import { ConfigUIForm } from '../components/index.js';
import { DevWrapper } from '../components/utils/devWrapper.js';
import { PluginContextProvider } from '../context/index.js';
import tablesData from './mocks/tables.js';
import { AuthType } from '../types.js';

// TODO WIP!!!!

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/FullConfig',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = {
  render: ({ initialValues, useConfig }) => {
    const teamName = 'cq-test';
    const context = 'wizard';

    const config = useConfig({ initialValues });

    return (
      <DevWrapper
        {...{
          teamName,
          initialValues,
        }}
      >
        <PluginContextProvider
          config={config}
          teamName={teamName}
          getTablesData={() => tablesData}
          hideStepper={context === 'wizard'} // TODO: Delete after iframe deprecation
          pluginUiMessageHandler={{} as any}
          initialValues={initialValues}
        >
          <ConfigUIForm prepareSubmitValues={(() => {}) as any} />
        </PluginContextProvider>
      </DevWrapper>
    );
  },
  args: {
    initialValues: {},
    useConfig: ({ initialValues }) => ({
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
              title: 'Authentication',
              subtitle: `This plugin uses OAuth authentication. Click the button below to connect CloudQuery to DataDog.`,
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
                  schema: yup
                    .mixed()
                    .oneOf(Object.values(AuthType))
                    .default(initialValues?.spec?.auth_token ? AuthType.OTHER : AuthType.OAUTH),
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
                        .default(initialValues?.spec?.accounts[0]?.name ?? ''),
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
                        .default(initialValues?.spec?.accounts[0]?.api_key ?? ''),
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
                        .default(initialValues?.spec?.accounts[0]?.app_key ?? ''),
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
                  schema: yup
                    .number()
                    .nullable()
                    .default(initialValues?.spec?.concurrency ?? 1000),
                },
              ],
            },
          ],
          title: 'Configuration',
        },
      ],
      auth: [AuthType.OTHER],
      // TODO: docs
      guide: {
        title: 'DataDog configuration',
        sections: [
          {
            bodies: [
              {
                text: 'CloudQuery reads information from your DataDog accounts and loads it into any supported CloudQuery destination.',
              },
            ],
          },
          {
            header: 'How to Create a Read-only API key',
            bodies: [
              {
                text: (
                  <>
                    1. Navigate to <strong>API Access Keys</strong> under the{' '}
                    <strong>Integrations</strong> tab in the web app.
                  </>
                ),
              },
              {
                image: `images/01-access-page.png`,
              },
              {
                text: (
                  <>
                    2. Click the <strong>Create New API Key</strong> button.
                  </>
                ),
              },
              {
                image: `images/02-click-button.png`,
              },
              {
                text: (
                  <>
                    3. Give the token a descriptive name, such as <strong>CloudQuery Token</strong>.
                  </>
                ),
              },
              {
                text: (
                  <>
                    4. Check the <strong>Read-only API Key</strong> checkbox.
                  </>
                ),
              },
              {
                image: `images/03-create-key.png`,
              },
              {
                text: (
                  <>
                    5. Click <strong>Create Key</strong>.
                  </>
                ),
              },
              {
                text: (
                  <>
                    6. <strong>Copy and paste</strong> the new key into the Auth Token field in the
                    form at the top of this page.
                  </>
                ),
              },
            ],
          },
          {
            header: 'How to Find a Team ID (Optional)',
            bodies: [
              {
                text: (
                  <>
                    Navigate to the desired team page(s). In each page, the team ID should be in the
                    URL in the address bar of the browser. Copy the team ID into the Team IDs field.
                  </>
                ),
              },
              {
                image: `images/04-find-team-id.png`,
              },
            ],
          },
        ],
      },
    }),
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};

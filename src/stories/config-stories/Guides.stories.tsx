import { AuthType, SourceConfig } from '../../types.js';

import { ConfigUIFormWrapper } from '../wrappers/configUiForm.js';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Examples/Guides',
  component: () => <></>,
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
              {
                code: `export EXTERNAL_ID=$(uuidgen)`,
              },
              {
                code: `cat >third-party-trust.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::\${CLOUDQUERY_ACCOUNT_ID}:role/\${SUB_DOMAIN}-cloudquery"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "sts:ExternalId": "\${EXTERNAL_ID}"
        }
      }
    }
  ]
}
EOF`,
                language: 'bash',
              },
            ],
          },
        ],
      },
    },
  },
};

export const WithTabs = {
  render: ConfigUIFormWrapper,
  args: {
    config: {
      name: 'example',
      type: 'source',
      label: 'Example Plugin',
      docsLink: 'https://hub.cloudquery.io/plugins/source/cloudquery/example/latest/docs',
      iconLink: 'images/logo.png',
      steps: [],
      auth: [AuthType.OTHER],
      guide: {
        title: 'Setup Guide with Tabs',
        sections: [
          {
            header: 'Choose Your Installation Method',
            bodies: [
              {
                text: 'Select the installation method that best fits your environment:',
              },
              {
                tabs: [
                  {
                    title: 'Docker',
                    content: [
                      {
                        text: 'Install using Docker for containerized environments.',
                      },
                      {
                        code: `docker run --rm -it \\
  -v $(pwd)/config.yml:/config.yml \\
  ghcr.io/cloudquery/cloudquery:latest \\
  sync config.yml`,
                        codeLanguage: 'bash',
                      },
                      {
                        text: 'Make sure Docker is installed and running on your system.',
                      },
                    ],
                  },
                  {
                    title: 'Binary',
                    content: [
                      {
                        text: 'Download and install the CloudQuery binary directly.',
                      },
                      {
                        code: `# Download for Linux/macOS
curl -L https://github.com/cloudquery/cloudquery/releases/latest/download/cloudquery_linux_amd64 -o cloudquery
chmod +x cloudquery`,
                        codeLanguage: 'bash',
                      },
                      {
                        code: `# Run CloudQuery
./cloudquery sync config.yml`,
                        codeLanguage: 'bash',
                      },
                    ],
                  },
                  {
                    title: 'npm',
                    content: [
                      {
                        text: 'Install via npm for Node.js environments.',
                      },
                      {
                        code: `npm install -g @cloudquery/cli`,
                        codeLanguage: 'bash',
                      },
                      {
                        code: `cloudquery sync config.yml`,
                        codeLanguage: 'bash',
                      },
                      {
                        text: 'Requires Node.js version 16 or higher.',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            header: 'Configuration Examples',
            bodies: [
              {
                text: 'Here are some common configuration patterns:',
              },
              {
                tabs: [
                  {
                    title: 'Basic Config',
                    content: [
                      {
                        text: 'A simple configuration to get started:',
                      },
                      {
                        code: `kind: source
spec:
  name: example
  path: cloudquery/example
  version: "v1.0.0"
  destinations: ["postgresql"]
  spec:
    # Plugin-specific configuration
    api_key: "your-api-key"`,
                        codeLanguage: 'yaml',
                      },
                    ],
                  },
                  {
                    title: 'Advanced Config',
                    content: [
                      {
                        text: 'Advanced configuration with multiple options:',
                      },
                      {
                        code: `kind: source
spec:
  name: example
  path: cloudquery/example
  version: "v1.0.0"
  destinations: ["postgresql", "s3"]
  spec:
    api_key: "your-api-key"
    max_retries: 3
    timeout: "30s"
    tables: ["*"]
    skip_tables: ["temp_*"]`,
                        codeLanguage: 'yaml',
                      },
                      {
                        text: 'This configuration includes retry logic and table filtering.',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },
};

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

// TODO
// export const WithReact = {
//   render: ConfigUIFormWrapper,
//   args: {
//     config: {
//       name: 'datadog',
//       type: 'source',
//       label: 'DataDog',
//       docsLink: 'https://hub.cloudquery.io/plugins/source/cloudquery/datadog/latest/docs',
//       iconLink: 'images/logo.png',
//       steps: [],
//       auth: [AuthType.OTHER],
//       guide: {
//         title: 'DataDog configuration',
//         sections: [
//           {
//             title: '',
//             bodies: [
//               {
//                 text: 'CloudQuery reads information from your DataDog accounts and loads it into any supported CloudQuery destination.',
//               },
//             ],
//           },
//         ],
//       },
//     },
//   },
// };

import { AuthType } from '../../../types';
import * as yup from 'yup';

export default {
  name: 'fastly',
  type: 'source',
  label: 'Fastly',
  docsLink: 'https://hub.cloudquery.io/plugins/source/cloudquery/fastly/latest/docs',
  iconLink: 'images/logo.png',
  steps: [
    {
      children: [
        {
          component: 'section',
          title: 'Authentication',
          subtitle: 'Use an API key to authenticate with Fastly',
          children: [
            {
              component: 'control-secret-field',
              name: 'fastly_api_key',
              helperText: 'Paste the API key you generated in the Fastly dashboard.',
              label: 'Fastly API Key',
              schema: yup.string().default('').required(),
            },
          ],
        },
      ],
      title: 'Configuration',
    },
  ],
  auth: [AuthType.OTHER],
  guide: {
    title: 'Fastly configuration',
    sections: [
      {
        bodies: [
          {
            text: 'CloudQuery reads information from your Fastly accounts and loads it into any supported CloudQuery destination.',
          },
        ],
      },
    ],
  },
};

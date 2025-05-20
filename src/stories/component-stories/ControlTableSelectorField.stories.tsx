import { LayoutTableSelector } from '../../components/form/renderer/types.js';
import { ControlTableSelectorField } from '../../components/index.js';
import { AuthType } from '../../types.js';

import tablesData from '../mocks/tables.js';
import { ConfigUIFormWrapper } from '../wrappers/configUiForm.js';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Components/TableSelector',
  component: ControlTableSelectorField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    component: {
      control: 'select',
      options: ['control-table-selector'],
    },
  },
  args: {
    component: 'control-table-selector',
  },
} satisfies Meta<LayoutTableSelector>;

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
              title: 'Tables',
              children: [
                {
                  component: 'control-table-selector',
                },
              ],
            },
          ],
        },
      ],
      auth: [AuthType.OTHER],
    },
    getTablesData: async () => ({ default: tablesData }),
  },
};

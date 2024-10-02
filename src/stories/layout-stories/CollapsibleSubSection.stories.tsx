import { LayoutCollapsibleSubSection } from '../../components/form/renderer/types.js';
import { CollapsibleSubSection } from '../../components/form/sections/collapsibleSubSection.js';

import { LayoutWrapper } from '../wrappers/layout.js';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Layout/CollapsibleSubSection',
  component: CollapsibleSubSection as any,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    component: {
      control: 'select',
      options: ['collapsible-sub-section'],
    },
  },
  args: {
    component: 'collapsible-sub-section',
    title: 'My Sub Section',
    subtitle:
      'A sub section can be collapsible. It can be configured to be open or closed by default.',
    defaultExpanded: false,
    children: [],
  },
} satisfies Meta<LayoutCollapsibleSubSection>;

export default meta;

export const Primary = {
  render: (args) => <LayoutWrapper args={args} />,
  args: {},
};

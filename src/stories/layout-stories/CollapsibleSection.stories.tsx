import { LayoutCollapsibleSection } from '../../components/form/renderer/types.js';
import { CollapsibleSection } from '../../components/form/sections/collapsibleSection.js';

import { LayoutWrapper } from '../wrappers/layout.js';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Layout/CollapsibleSection',
  component: CollapsibleSection as any,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    component: {
      control: 'select',
      options: ['collapsible-section'],
    },
  },
  args: {
    component: 'collapsible-section',
    title: 'My Section',
    subtitle: 'A section can be collapsible. It can be configured to be open or closed by default.',
    defaultExpanded: false,
    children: [],
  },
} satisfies Meta<LayoutCollapsibleSection>;

export default meta;

export const Primary = {
  render: (args) => <LayoutWrapper args={args} />,
  args: {},
};

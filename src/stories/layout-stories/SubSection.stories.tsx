import { LayoutSubSection } from '../../components/form/renderer/types.js';

import { SubSection } from '../../components/form/sections/subSection.js';
import { LayoutWrapper } from '../wrappers/layout.js';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Layout/SubSection',
  component: SubSection as any,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    component: {
      control: 'select',
      options: ['sub-section'],
    },
  },
  args: {
    component: 'sub-section',
    title: 'My Sub Section',
    subtitle: "A Sub Section encapsulates it's children with spacing.",
    children: [],
  },
} satisfies Meta<LayoutSubSection>;

export default meta;

export const Primary = {
  render: (args) => <LayoutWrapper args={args} />,
  args: {},
};

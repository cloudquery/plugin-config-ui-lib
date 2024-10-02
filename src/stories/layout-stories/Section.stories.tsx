import { LayoutSection } from '../../components/form/renderer/types.js';
import { Section } from '../../components/form/sections/section.js';

import { LayoutWrapper } from '../wrappers/layout.js';

import type { Meta } from '@storybook/react';

const meta = {
  title: 'Layout/Section',
  component: Section as any,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    component: {
      control: 'select',
      options: ['section'],
    },
  },
  args: {
    component: 'section',
    title: 'My Section',
    subtitle: "A section encapsulates it's children in a colored Card.",
    children: [],
  },
} satisfies Meta<LayoutSection>;

export default meta;

export const Primary = {
  render: (args) => <LayoutWrapper args={args} />,
  args: {},
};

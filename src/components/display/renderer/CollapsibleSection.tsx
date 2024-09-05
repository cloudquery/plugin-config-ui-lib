import React from 'react';

import { AccordionProps } from '@mui/material/Accordion';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { CollapsibleSubSection } from './CollapsibleSubSection';

/**
 * @public
 */
export interface CollapsibleSectionProps {
  children: React.ReactNode;
  defaultExpanded?: AccordionProps['defaultExpanded'];
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

/**
 * @public
 */
export function CollapsibleSection({
  children,
  defaultExpanded = true,
  title,
  subtitle,
}: CollapsibleSectionProps) {
  return (
    <Card>
      <CardContent>
        <CollapsibleSubSection defaultExpanded={defaultExpanded} title={title} subtitle={subtitle}>
          {children}
        </CollapsibleSubSection>
      </CardContent>
    </Card>
  );
}

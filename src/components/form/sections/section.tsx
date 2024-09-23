import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { SubSection } from './subSection';

/**
 * @public
 */
export interface SectionProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
}

/**
 * @public
 */
export function Section({ children, title, subtitle }: SectionProps) {
  return (
    <Card>
      <CardContent>
        <SubSection title={title} subtitle={subtitle}>
          {children}
        </SubSection>
      </CardContent>
    </Card>
  );
}

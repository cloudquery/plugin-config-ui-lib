import React from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import useTheme from '@mui/material/styles/useTheme';
import Typography from '@mui/material/Typography/Typography';

import { SubSection } from './subSection';

/**
 * @public
 */
export interface CollapsibleSubSectionProps {
  children: React.ReactNode;
  defaultExpanded?: AccordionProps['defaultExpanded'];
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

/**
 * @public
 */
export function CollapsibleSubSection({
  children,
  defaultExpanded = true,
  title,
  subtitle,
}: CollapsibleSubSectionProps) {
  const { palette } = useTheme();

  return (
    <Accordion
      disableGutters={true}
      sx={{
        '&:before': {
          display: 'none',
        },
        boxShadow: 'none',
        backgroundColor: 'transparent',
      }}
      defaultExpanded={defaultExpanded}
    >
      <AccordionSummary
        sx={{ backgroundColor: 'transparent', paddingLeft: 0 }}
        expandIcon={<ExpandMoreIcon />}
      >
        {title && <Typography variant="h6">{title}</Typography>}
        {subtitle && (
          <Typography variant="body2" sx={{ color: palette.text.secondary }}>
            {subtitle}
          </Typography>
        )}
      </AccordionSummary>
      <AccordionDetails sx={{ paddingLeft: 0 }}>
        <SubSection>{children}</SubSection>
      </AccordionDetails>
    </Accordion>
  );
}

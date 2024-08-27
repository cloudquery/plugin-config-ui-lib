import Typography from '@mui/material/Typography/Typography';
import React from 'react';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SubSection } from './SubSection';

/**
 * @public
 */
export interface CollapsibleSubSectionProps {
  children: React.ReactNode;
  defaultExpanded: AccordionProps['defaultExpanded'];
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
          <Typography variant="body2" color="textSecondary">
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

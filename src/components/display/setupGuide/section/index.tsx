import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

import { GuideSection, GuideSectionBody, GuideSectionBodyTabs } from '../../../../types';
import { parseSrc } from '../../../../utils/parseSrc';
import { ConditionalRenderingWrapper } from '../../../controls/conditionalRenderingWrapper';
import { CodeSnippet } from '../../codeSnippet';
import { LightboxImage } from '../../lightboxImage';

/**
 * @public
 */
export type RenderGuideProps = {
  sections: GuideSection[];
};

/**
 * RenderGuide component formats and displays Guide sections with code snippets and images.
 *
 * @public
 */
export function RenderGuide({ sections }: RenderGuideProps) {
  return (
    <Stack
      sx={{
        gap: 3,
      }}
    >
      {sections.map((section, index) => (
        <ConditionalRenderingWrapper key={index} shouldRender={section.shouldRender}>
          <Stack
            sx={{
              gap: 2,
              wordBreak: 'break-word',
            }}
          >
            {section.header && <Typography variant="h6">{section.header}</Typography>}
            {section.bodies.map((body, index) => (
              <ConditionalRenderingWrapper key={index} shouldRender={section.shouldRender}>
                <RenderGuideSectionBody body={body} />
              </ConditionalRenderingWrapper>
            ))}
          </Stack>
        </ConditionalRenderingWrapper>
      ))}
    </Stack>
  );
}

function GuideSectionBodyTabsRenderer({ tabs }: { tabs: GuideSectionBodyTabs }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="guide section tabs">
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.title}
              id={`guide-tab-${index}`}
              aria-controls={`guide-tabpanel-${index}`}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          hidden={value !== index}
          id={`guide-tabpanel-${index}`}
          aria-labelledby={`guide-tab-${index}`}
        >
          {value === index && (
            <Box sx={{ pt: 3, pr: 3, pb: 3, minWidth: 0, overflow: 'hidden' }}>
              <Stack sx={{ gap: 2, minWidth: 0 }}>
                {tab.content.map((contentItem, contentIndex) => (
                  <Box key={contentIndex} sx={{ minWidth: 0, overflow: 'hidden' }}>
                    <RenderGuideSectionBody body={contentItem} />
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </div>
      ))}
    </Box>
  );
}

function RenderGuideSectionBody({ body }: { body: GuideSectionBody }) {
  if (body.tabs) {
    return <GuideSectionBodyTabsRenderer tabs={body.tabs} />;
  } else if (body.code) {
    return <CodeSnippet text={body.code} language={body.codeLanguage} />;
  } else if (body.image) {
    return <LightboxImage key={body.image} src={parseSrc(body.image)} alt={body.text} />;
  } else {
    return (
      <Typography component="div" variant="body1" color="textSecondary">
        {body.text}
      </Typography>
    );
  }
}

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { GuideSection, GuideSectionBody } from '../../../../types';
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

function RenderGuideSectionBody({ body }: { body: GuideSectionBody }) {
  if (body.code) {
    return <CodeSnippet text={body.code} />;
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

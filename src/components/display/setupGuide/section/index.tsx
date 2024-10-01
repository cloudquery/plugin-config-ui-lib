import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { CodeSnippet } from '../../codeSnippet';
import { ConditionalRenderingWrapper } from '../../../controls/conditionalRenderingWrapper';
import { LightboxImage } from '../../lightboxImage';

type SectionBody = {
  code?: string;
  image?: string;
  text?: any;
  shouldRender?: (values: any) => boolean;
};

type Section = {
  header?: string;
  bodies: SectionBody[];
  shouldRender?: (values: any) => boolean;
};

/**
 * @public
 */
export type RenderGuideProps = {
  sections: Section[];
  pluginUiMessageHandler: PluginUiMessageHandler;
};

/**
 * RenderGuide component formats and displays Guide sections with code snippets and images.
 *
 * @public
 */
export function RenderGuide({ sections, pluginUiMessageHandler }: RenderGuideProps) {
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
                <RenderSectionBody body={body} pluginUiMessageHandler={pluginUiMessageHandler} />
              </ConditionalRenderingWrapper>
            ))}
          </Stack>
        </ConditionalRenderingWrapper>
      ))}
    </Stack>
  );
}

function RenderSectionBody({
  body,
  pluginUiMessageHandler,
}: {
  pluginUiMessageHandler: PluginUiMessageHandler;
  body: SectionBody;
}) {
  if (body.code) {
    return <CodeSnippet text={body.code} />;
  } else if (body.image) {
    return (
      <LightboxImage
        pluginUiMessageHandler={pluginUiMessageHandler}
        key={body.image}
        src={body.image}
        alt={body.text}
      />
    );
  } else {
    return (
      <Typography component="div" variant="body1" color="textSecondary">
        {body.text}
      </Typography>
    );
  }
}

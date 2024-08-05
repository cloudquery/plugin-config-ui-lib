import { PluginUiMessageHandler } from '@cloudquery/plugin-config-ui-connector';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { CodeSnippet } from './codeSnippet';
import { LightboxImage } from '../../lightboxImage';

type Section = {
  header?: string;
  bodies: {
    code?: string;
    image?: string;
    text?: any;
  }[];
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
    <Stack gap={3}>
      {sections.map((section, index) => (
        <Stack key={index} gap={2} sx={{ wordBreak: 'break-word' }}>
          {section.header && <Typography variant="h6">{section.header}</Typography>}
          {section.bodies.map((body, index) => {
            if (body.code) {
              return <CodeSnippet key={index} text={body.code} />;
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
                <Typography component="div" key={index} variant="body1" color="textSecondary">
                  {body.text}
                </Typography>
              );
            }
          })}
        </Stack>
      ))}
    </Stack>
  );
}

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { CodeSnippet } from './codeSnippet';
import { LightboxImage } from '../lightboxImage';

type Section = {
  header?: string;
  bodies: {
    code?: string;
    image?: string;
    text?: any;
  }[];
};

type Props = {
  sections: Section[];
};

/**
 * RenderGuide component formats and displays Guide sections with code snippets and images.
 *
 * @public
 */
export function RenderGuide({ sections }: Props) {
  return (
    <Stack gap={3}>
      {sections.map((section, index) => (
        <Stack key={index} gap={2}>
          {section.header && <Typography variant="h6">{section.header}</Typography>}
          {section.bodies.map((body, index) => {
            if (body.code) {
              return <CodeSnippet key={index} text={body.code} />;
            } else if (body.image) {
              return <LightboxImage key={body.image} src={body.image} alt={body.text} />;
            } else {
              return (
                <Typography key={index} variant="body1" color="textSecondary">
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

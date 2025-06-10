import Box from '@mui/material/Box';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { CopyToClipboardButton } from './copyToClipboard';

/**
 * @public
 */
export interface CodeSnippetProps {
  text: string;
  language?: string;
}

/**
 * CodeSnippet component displays text as a code block with a copy button.
 *
 * @public
 */
export function CodeSnippet({ text, language = 'bash' }: CodeSnippetProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 1.5,
        bgcolor: 'secondary.darkMedium',
        borderRadius: 1,
        borderColor: 'neutral.300',
        border: '1px solid',
        justifyContent: 'space-between',
      }}
    >
      <SyntaxHighlighter
        codeTagProps={{
          style: {
            backgroundColor: 'transparent',
            fontSize: '13px',
            fontVariantLigatures: 'none',
            lineHeight: '150%',
            maxWidth: '100%',
            overflow: 'auto',
            verticalAlign: 'middle',
          },
        }}
        customStyle={{
          background: 'transparent',
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          fontFamily: "'Azeret Mono Variable', sans-serif",
          marginBottom: 0,
          marginTop: 0,
          padding: 0,
        }}
        language={language}
        style={oneDark}
        useInlineStyles={true}
      >
        {text}
      </SyntaxHighlighter>
      <CopyToClipboardButton text={text} sx={{ alignSelf: 'flex-start' }} />
    </Box>
  );
}

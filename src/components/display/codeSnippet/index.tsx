import { useMemo } from 'react';

import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

import { CopyToClipboardButton } from './copyToClipboard';
import { highlightSyntax } from './highlightSyntax';

/**
 * @public
 */
export interface CodeSnippetProps {
  text: string;
}

/**
 * CodeSnippet component displays text in specialized text with a copy button.
 *
 * @public
 */
export function CodeSnippet({ text }: CodeSnippetProps) {
  const { palette } = useTheme();

  const code = useMemo(() => {
    try {
      return JSON.stringify(JSON.parse(text), undefined, 4);
    } catch {
      return text;
    }
  }, [text]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'start',
        bgcolor: 'background.paperTertiary',
        borderRadius: 1,
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          minHeight: '40px',
          '& pre': {
            whiteSpace: 'break-spaces',
            outline: 'none',
            margin: 1.5,
            fontSize: '12px',
          },
          '& .value': { color: palette.text.secondary },
          '& .key': { color: palette.info.main },
        }}
      >
        <pre
          dangerouslySetInnerHTML={{
            __html: highlightSyntax(code),
          }}
        />
      </Box>
      <CopyToClipboardButton text={code} />
    </Box>
  );
}

import { useMemo } from 'react';

import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';

// NOTE: idea is to keep this lightweight and not need to import a full library. Maybe worth putting something in cloud-ui..
// https://dev.to/gauravadhikari1997/show-json-as-pretty-print-with-syntax-highlighting-3jpm
function syntaxHighlight(json: any) {
  if (!json) {
    return ''; //no JSON from response
  }

  const parsedJson = json.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

  return parsedJson.replaceAll(
    /("(\\u[\dA-Za-z]{4}|\\[^u]|[^"\\])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[Ee][+-]?\d+)?)/g,
    function (match: any) {
      let cls = 'number';
      if (match.startsWith('"')) {
        cls = match.endsWith(':') ? 'key' : 'value';
      } else {
        cls = 'value';
      }

      return `<span class="${cls}">${match}</span>`;
    },
  );
}

interface Props {
  text: string;
}

export function CodeSnippet({ text }: Props) {
  const { palette } = useTheme();

  const html = useMemo(() => {
    try {
      const json = JSON.stringify(JSON.parse(text), undefined, 4);

      return syntaxHighlight(json);
    } catch {
      return syntaxHighlight(text);
    }
  }, [text]);

  return (
    <Box
      sx={{
        '& pre': { whiteSpace: 'break-spaces', outline: 'none', margin: 1.5, fontSize: '12px' },
        '& .value': { color: palette.text.secondary },
        '& .key': { color: palette.info.main },
      }}
    >
      <pre
        dangerouslySetInnerHTML={{
          __html: html,
        }}
      />
    </Box>
  );
}

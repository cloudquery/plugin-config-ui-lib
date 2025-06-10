import { useState } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentCopiedIcon from '@mui/icons-material/ContentCopyRounded';
import { Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { SxProps } from '@mui/material/styles';

interface Props {
  sx?: SxProps;
  text: string;
}

export function CopyToClipboardButton({ sx, text }: Props) {
  const [wasCopied, setWasCopied] = useState(false);

  const handleClick = () => {
    // Because the code is running in an iframe but elements
    // are rendered in the parent window, we need to create a button
    // to focus and click it to establish user activation
    const button = document.createElement('button');
    button.style.position = 'fixed';
    button.style.opacity = '0';
    button.style.pointerEvents = 'none';
    document.body.append(button);
    button.focus();
    button.click();

    navigator.clipboard.writeText(text);

    button.remove();
    setWasCopied(true);
  };

  return (
    <Tooltip title={wasCopied ? 'Copied' : 'Copy'}>
      <Box sx={sx} onMouseLeave={() => window.setTimeout(() => setWasCopied(false), 100)}>
        <IconButton
          aria-label="copy"
          onClick={handleClick}
          sx={{
            cursor: 'pointer',
          }}
        >
          {wasCopied ? <ContentCopiedIcon /> : <ContentCopyIcon />}
        </IconButton>
      </Box>
    </Tooltip>
  );
}

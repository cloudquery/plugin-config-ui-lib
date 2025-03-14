import { useState } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentCopiedIcon from '@mui/icons-material/ContentCopyRounded';
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
    const button = document.createElement('button');
    button.style.position = 'fixed';
    button.style.opacity = '0';
    button.style.pointerEvents = 'none';
    document.body.append(button);
    button.focus();
    button.click(); // This establishes user activation

    // Now clipboard API should work
    navigator.clipboard.writeText(text);

    button.remove();
    setWasCopied(true);
  };

  return (
    <Box sx={sx}>
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
  );
}

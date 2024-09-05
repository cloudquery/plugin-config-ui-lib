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
    navigator.clipboard.writeText(text);
    setWasCopied(true);
  };

  return (
    <Box paddingRight="5px" position="absolute" right={0} sx={sx} top={5}>
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

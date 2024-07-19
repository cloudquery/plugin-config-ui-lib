import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import useTheme from '@mui/material/styles/useTheme';

type Props = {
  width?: number;
  height?: number;
  src: string;
  fallbackSrc?: string;
  alt?: string;
};

const PADDING = 4;

/**
 * Logo component standardizes the look of service and company logos in the custom plugins.
 *
 * @public
 */
export function Logo({ width = 24, height = 24, src, alt, fallbackSrc }: Props) {
  const { palette } = useTheme();
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleError = () => {
    if (fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
  };

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <Box
      sx={{
        borderRadius: `${PADDING}px`,
        padding: `${PADDING}px`,
        backgroundColor: palette.secondary.light,
        height,
        width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={currentSrc}
        alt={alt ?? src}
        height={height - PADDING}
        width={width - PADDING}
        onError={currentSrc === src ? handleError : undefined}
      />
    </Box>
  );
}

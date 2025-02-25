'use client';

import React, { ImgHTMLAttributes, useCallback, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { backdropClasses } from '@mui/material/Backdrop';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';

/**
 * This component displays an image that can be opened in a lightbox.
 *
 * @public
 */
export function LightboxImage({ sizes, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      setOpen(true);
    }
  }, []);

  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setIsLoaded(false);
  }, []);

  const handleContainerClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const closestImage = (event.target as HTMLDivElement).closest('img');
      if (closestImage) {
        return;
      }

      handleClose();
    },
    [handleClose],
  );

  return (
    <>
      <button
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          position: 'relative',
          width: '100%',
        }}
      >
        <img
          {...props}
          sizes={sizes}
          style={{ display: 'block', height: 'auto', maxWidth: '100%', ...props.style }}
        />
      </button>
      <Modal
        aria-label={props.alt}
        onClose={handleClose}
        open={open}
        slotProps={{
          backdrop: {
            sx: {
              [`&:not(.${backdropClasses.invisible})`]: { backgroundColor: 'rgba(0, 0, 0, 0.85)' },
            },
          },
        }}
      >
        <Box
          height="100%"
          onClick={handleContainerClick}
          paddingX={2}
          paddingY={7}
          sx={{ position: 'relative' }}
          width="100%"
        >
          <IconButton
            autoFocus={true}
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8 }}
            title="Close"
          >
            <CloseIcon />
          </IconButton>
          <Stack
            alignItems="center"
            height="100%"
            justifyContent="center"
            overflow="auto"
            position="relative"
            width="100%"
          >
            {!isLoaded && <CircularProgress />}
            <img
              {...props}
              height={typeof window === 'undefined' ? 0 : window.innerHeight}
              onLoad={() => setIsLoaded(true)}
              sizes="100vw"
              style={{
                height: 'auto',
                maxHeight: isLoaded ? undefined : 0,
                maxWidth: '100%',
              }}
              width={typeof window === 'undefined' ? 0 : window.innerWidth}
            />
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

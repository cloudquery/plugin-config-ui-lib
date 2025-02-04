'use client';

import React, { TransitionEvent, useEffect, useRef, useState } from 'react';

import Box, { BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { duration } from '@mui/material/styles/createTransitions';

import useTheme from '@mui/material/styles/useTheme';

import { CollapseToggle } from './collapseToggle';

interface Props extends Omit<BoxProps, 'width' | 'minWidth'> {
  collapsible?: boolean;
  minWidth?: number;
  resizable?: boolean;
  width?: number;
}

export function CollapsibleResizableContainer({
  children,
  collapsible,
  resizable,
  ...props
}: Props) {
  const { transitions } = useTheme();
  const [width, setWidth] = useState<number | undefined>(undefined); // Initial width of the container
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [applyMinWidth, setApplyMinWidth] = useState(false);
  const disableTransition = useRef(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) {
      return;
    }

    const startX = e.clientX;
    const startWidth = width ?? containerRef.current?.clientWidth;
    disableTransition.current = true;

    const onMouseMove = (e: MouseEvent) => {
      setWidth(startWidth + (e.clientX - startX));
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.userSelect = '';
      disableTransition.current = false;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.body.style.userSelect = 'none';
  };

  const handleTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.propertyName !== 'width') {
      return;
    }

    if (!isCollapsed) {
      setApplyMinWidth(true);
    }
  };

  useEffect(() => {
    if (isCollapsed) {
      setApplyMinWidth(false);
    }
  }, [isCollapsed]);

  const parsedWidth = Math.max(width ?? props.width ?? 0, props.minWidth ?? 0);

  return (
    <Box
      ref={containerRef}
      position="relative"
      {...props}
      minWidth={applyMinWidth ? (isCollapsed ? 24 : props.minWidth) : undefined}
      onTransitionEnd={handleTransitionEnd}
      sx={{
        ...props.sx,
        transition: disableTransition.current
          ? undefined
          : `width ${duration.standard}ms ${transitions.easing.easeInOut}`,
        [`.${CollapseToggle.className}`]: {
          opacity: 0,
        },
        [`&:hover .${CollapseToggle.className}`]: {
          opacity: 1,
        },
      }}
      width={isCollapsed ? 24 : parsedWidth}
    >
      <Stack flex="1 1 auto" minHeight={0} overflow="hidden">
        <Stack flex="1 1 auto" minHeight={0} overflow="visible" width={parsedWidth}>
          {children}
        </Stack>
      </Stack>
      {resizable && (
        <Box
          bottom={0}
          height="100%"
          onMouseDown={handleMouseDown}
          position="absolute"
          right={-5}
          sx={{ cursor: 'ew-resize' }}
          title="Resize"
          top={0}
          width={10}
          zIndex={1}
        />
      )}
      {collapsible && (
        <CollapseToggle collapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />
      )}
    </Box>
  );
}

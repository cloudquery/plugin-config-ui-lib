import { ChevronRight } from '@mui/icons-material';
import ChevronLeft from '@mui/icons-material/ChevronLeft';

import IconButton from '@mui/material/IconButton';
import useTheme from '@mui/material/styles/useTheme';

interface Props {
  collapsed: boolean;
  onClick: () => void;
  togglePosition?: 'left' | 'right';
}

export function CollapseToggle({ collapsed, onClick, togglePosition = 'left' }: Props) {
  const { transitions } = useTheme();

  return (
    <IconButton
      className={CollapseToggle.className}
      onClick={onClick}
      sx={{
        '&:hover': {
          bgcolor: 'background.paper',
        },
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        position: 'absolute',
        left: togglePosition === 'left' ? 0 : undefined,
        right: togglePosition === 'right' ? 0 : undefined,
        top: '50%',
        transform: collapsed ? 'translate(50%, -50%) rotate(180deg)' : 'translate(50%, -50%)',
        transition: `opacity 150ms ${transitions.easing.easeInOut}, transform 150ms ${transitions.easing.easeInOut}`,
        zIndex: 999,
      }}
    >
      {togglePosition === 'left' ? <ChevronLeft /> : <ChevronRight />}
    </IconButton>
  );
}

CollapseToggle.className = 'shared-collapse-toggle';

import ChevronLeft from '@mui/icons-material/ChevronLeft';

import IconButton from '@mui/material/IconButton';
import useTheme from '@mui/material/styles/useTheme';

interface Props {
  collapsed: boolean;
  onClick: () => void;
}

export function CollapseToggle({ collapsed, onClick }: Props) {
  const { transitions } = useTheme();

  return (
    <IconButton
      className={CollapseToggle.className}
      onClick={onClick}
      sx={{
        '&:hover': {
          bgcolor: 'nav.evidentBg',
        },
        bgcolor: 'nav.evidentBg',
        border: '1px solid',
        borderColor: 'nav.evidentDivider',
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: collapsed ? 'translate(50%, -50%) rotate(180deg)' : 'translate(50%, -50%)',
        transition: `opacity 150ms ${transitions.easing.easeInOut}, transform 150ms ${transitions.easing.easeInOut}`,
        zIndex: 999,
      }}
    >
      <ChevronLeft />
    </IconButton>
  );
}

CollapseToggle.className = 'shared-collapse-toggle';

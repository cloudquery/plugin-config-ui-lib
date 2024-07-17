import { forwardRef, ReactNode } from 'react';

import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import useTheme from '@mui/material/styles/useTheme';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

interface Props {
  /** Callback that is called when the selected value changes. */
  onChange: (newValue: string | number | boolean) => void;
  /** The currently selected value. */
  value: string | number | boolean;
  /** The title of the radio group. */
  title?: string;
  /** The radio buttons to display. */
  options: Array<{
    label: ReactNode;
    description?: ReactNode;
    value: string | number | boolean;
    disabled?: boolean;
  }>;
}

/**
 * ExclusiveToggle component acts as a styled radio
 *
 * @public
 */
export const ExclusiveToggle = forwardRef<HTMLElement, Props>(
  ({ options, onChange, value, title }, ref) => {
    const { palette } = useTheme();

    return (
      <ToggleButtonGroup
        aria-label={title}
        color="primary"
        exclusive={true}
        onChange={(event, newValue) => {
          if (event.type === 'click' && newValue !== null) {
            onChange(newValue);
          }
        }}
        value={value}
        ref={ref}
      >
        <Stack direction="row" spacing={2} width="100%">
          {options.map((item) => {
            const isSelected = value === item.value;

            return (
              <ToggleButton
                key={String(item.value)}
                disabled={item.disabled}
                fullWidth={true}
                value={item.value}
                sx={{
                  padding: item.description ? undefined : '2px',
                }}
              >
                <Radio checked={isSelected} />
                <Stack marginLeft={0.5} paddingY={1.25} spacing={0.5}>
                  <Typography
                    color={isSelected ? palette.text.primary : palette.text.secondary}
                    sx={{ opacity: isSelected ? 1 : 0.8 }}
                    variant="body1Bold"
                  >
                    {item.label}
                  </Typography>
                  {!!item.description && (
                    <Typography
                      color={isSelected ? palette.text.primary : palette.text.secondary}
                      sx={{ opacity: isSelected ? 1 : 0.8 }}
                      variant="body2"
                    >
                      {item.description}
                    </Typography>
                  )}
                </Stack>
              </ToggleButton>
            );
          })}
        </Stack>
      </ToggleButtonGroup>
    );
  },
);

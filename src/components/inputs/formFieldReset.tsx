import { useCallback } from 'react';

import Button, { ButtonProps } from '@mui/material/Button';

/**
 * @public
 */
export interface FormFieldResetProps {
  // Whether the field is currently resetted or not
  isResetted: boolean;
  // The function to call when the field is resetted
  onReset: () => void;
  // The function to call when the reset is cancelled
  onCancel: () => void;
  // The selector of the input to focus after the reset
  inputSelectorToFocus?: string;
  // The sx props to apply to the button
  sx?: ButtonProps['sx'];
}

/**
 * This component is used to reset a form field whose initial value
 * includes environment variable
 *
 * @public
 */
export function FormFieldReset({
  isResetted,
  onReset,
  onCancel,
  inputSelectorToFocus,
  sx,
}: FormFieldResetProps) {
  const handleReset = useCallback(() => {
    onReset();
    if (inputSelectorToFocus) {
      setTimeout(() => {
        const element = document.querySelector(inputSelectorToFocus) as HTMLInputElement | null;
        element?.focus();
      }, 0);
    }
  }, [onReset, inputSelectorToFocus]);

  if (isResetted) {
    return (
      <Button
        size="small"
        onClick={onCancel}
        sx={{ width: 80, minHeight: 48, ...sx }}
        variant="outlined"
      >
        Cancel
      </Button>
    );
  }

  return (
    <Button
      size="small"
      onClick={handleReset}
      sx={{ width: 80, minHeight: 48, ...sx }}
      variant="outlined"
    >
      Reset
    </Button>
  );
}

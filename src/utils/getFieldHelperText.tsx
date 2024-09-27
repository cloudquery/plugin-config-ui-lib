import { ReactNode } from 'react';

import Box from '@mui/material/Box';

/**
 * Returns a helper text for a form field, combining an error message (if present) with additional helper text.
 * If an error message is provided, it is displayed first, followed by the helper text.
 *
 * @param errorMessage - The error message to display, if any.
 * @param helperText - Additional helper text or ReactNode to display.
 * @returns A string or ReactNode containing the combined error message and helper text.
 *
 * @public
 */
export function getFieldHelperText(
  errorMessage: string | undefined,
  helperText: string | ReactNode,
) {
  if (!errorMessage) {
    return helperText;
  }

  const parsedErrorMessage = errorMessage.endsWith('.') ? `${errorMessage} ` : `${errorMessage}. `;
  if (typeof helperText === 'string') {
    return (
      <Box
        component="span"
        sx={{
          whiteSpace: 'pre-line',
        }}
      >
        {parsedErrorMessage}
        {helperText}
      </Box>
    );
  }

  return (
    <Box
      component="span"
      sx={{
        whiteSpace: 'pre-line',
      }}
    >
      {parsedErrorMessage}
      {helperText}
    </Box>
  );
}

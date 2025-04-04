import { ReactNode } from 'react';

import { createThemeOptions } from '@cloudquery/cloud-ui';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { render as rtlRender } from '@testing-library/react';

type RenderParams = Parameters<typeof rtlRender>;

export const theme = createTheme(createThemeOptions());

export function renderWithTheme(ui: RenderParams[0], options?: RenderParams[1]) {
  function Wrapper({ children }: { children: ReactNode }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }

  return rtlRender(ui, { wrapper: Wrapper, ...options });
}

import { expect, test, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { App } from '../App';
import { VirtuosoMockContext } from '@cloudquery/plugin-config-ui-lib';

// Mock window.open
const mockOpen = vi.fn();
window.open = mockOpen;

const baseUrl = 'https://api.cloudquery.io/teams/undefined';

test('Create an integration', { timeout: 1000 * 60 }, async () => {
  let container: HTMLElement = document.createElement('div');
  await act(async () => {
    container = render(<App />, {
      wrapper: ({ children }) => (
        <VirtuosoMockContext.Provider value={{ viewportHeight: 2000, itemHeight: 100 }}>
          {children}
        </VirtuosoMockContext.Provider>
      ),
    }).container;
  });

  if (!container) {
    throw new Error('Container not found');
  }

  await waitFor(
    () => {
      expect(screen.getByText('Create an integration')).toBeInTheDocument();
    },
    { timeout: 10000 },
  );

});


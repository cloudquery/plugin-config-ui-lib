
import { renderHook } from '@testing-library/react';
import { useGetTables } from '../useGetTables';

const tablesJson = require('./data/tables.json')

describe('useGetTables', () => {
  test('should flatten n-level nested table definition', async () => {

    const { result } = renderHook(() => useGetTables(tablesJson));
    const flatTables = result.current;

    expect(flatTables.length).toBe(10);
    expect(flatTables.find(table => table.name === 'github_repositories')?.relations).toMatchObject([
      "github_releases",
      "github_repository_branches",
      "github_repository_collaborators",
      "github_repository_custom_properties",
      "github_repository_dependabot_alerts",
      "github_repository_dependabot_secrets",
      "github_repository_keys",
      "github_repository_sboms",
    ]);
    expect(flatTables.find(table => table.name === 'github_releases')?.relations).toMatchObject([
      "github_release_assets",
    ]);
  }); 
})

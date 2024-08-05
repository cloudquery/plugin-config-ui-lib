
import { generateTablesFromJson } from '../generateTablesFromJson';

const tablesJson = require('./data/cqTables.json')

describe('useGetTables', () => {
  test('should flatten n-level nested table definition', async () => {

    const flatTables = generateTablesFromJson(tablesJson)

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

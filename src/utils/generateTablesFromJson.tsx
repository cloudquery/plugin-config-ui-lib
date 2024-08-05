import { PluginTable } from '../components';

/**
 * @public
 */
export interface CloudQueryTable {
  name: string;
  title: string;
  description: string;
  is_incremental?: boolean;
  is_paid?: boolean;
  relations: CloudQueryTable[];
  columns: unknown[];
}

/**
 * Output shape of json from `cloudquery tables` command.
 *
 * @public
 */
export type CloudQueryTables = CloudQueryTable[];

/**
 * Utility takes the output of `cloudquery tables` to recursively expand child nodes under their parents.
 *
 * @public
 */
export const generateTablesFromJson = (tablesJson: CloudQueryTable[]): PluginTable[] => {
  const tables: PluginTable[] = [];

  const addTables = (table: CloudQueryTable) => {
    tables.push({
      ...table,
      is_incremental: !!table.is_incremental,
      relations: table.relations?.map((relation: CloudQueryTable) => relation.name) || [],
    });

    if (table.relations) {
      for (const relation of table.relations) {
        addTables(relation);
      }
    }
  };

  for (const table of tablesJson) {
    addTables(table);
  }

  return tables;
};

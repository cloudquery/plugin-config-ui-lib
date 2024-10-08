import { PluginTable, PluginTableListItem } from '../components';

/**
 * generatePluginTableList utility takes the output of `useGetTables` and reshapes the data
 * to compatability with the TableSelector component.
 *
 * @public
 */
export function generatePluginTableList(tables?: PluginTable[]): PluginTableListItem[] {
  const tablesMap = new Map<string, PluginTableListItem>();

  if (!tables) {
    return [];
  }

  // Some of the child tables might not have explicit "parent"
  // but the "parent" always lists them in the "relations". Therefore,
  // for every item in "relations" we need to add "parent" explicitly
  // to the tablesMap.
  for (const table of tables) {
    const currentTable = tablesMap.get(table.name);
    tablesMap.set(table.name, {
      ...table,
      ...currentTable,
      parentTable: undefined,
      parent: '',
      relationTables: [],
      ...tablesMap.get(table.name),
    });

    if (table.relations.length > 0) {
      for (const relationTableName of table.relations) {
        const currentRelationTable = tablesMap.get(relationTableName);
        tablesMap.set(relationTableName, {
          ...currentRelationTable,
          parent: table.name,
        } as PluginTableListItem);
      }
    }
  }

  // eslint-disable-next-line unicorn/prefer-spread
  const values = Array.from(tablesMap.values());
  for (const table of values) {
    if (table.parent) {
      table.parentTable = tablesMap.get(table.parent);
    }

    if ((table.relations?.length ?? 0) > 0) {
      for (const relation of table.relations!) {
        const relationTable = tablesMap.get(relation);
        if (relationTable) {
          table.relationTables.push(relationTable);
        }
      }
    }
  }

  return values;
}

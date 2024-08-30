import { PluginTable } from '../components';

/**
 * getEnabledTablesObject utility takes the list of tables and the list of enabled tables
 * and returns an object with the enabled tables set to true.
 *
 * @public
 */
export const getEnabledTablesObject = ({
  tablesList = [],
  tables = [],
}: {
  tablesList?: PluginTable[];
  tables?: string[];
}): Record<string, boolean> => {
  const enabledTablesObject: Record<string, boolean> = {};

  if ((tables.length === 1 && tables[0] === '*') || tablesList.length === 1) {
    for (const table of tablesList) {
      enabledTablesObject[table.name] = true;
    }

    return enabledTablesObject;
  } else {
    for (const table of tables) {
      if (table !== '*') {
        enabledTablesObject[table] = true;
      }
    }
  }

  return enabledTablesObject;
};

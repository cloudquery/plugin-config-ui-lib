
/**
 * PluginTable[] is the expected shape of tables for the TableSelector component.
 *
 * @public
 */
export interface PluginTable {
  /** Description of the table */
  description: string;
  /** Whether the table is incremental */
  is_incremental: boolean;
  /** Whether the table is paid */
  is_paid?: boolean;
  name: string;
  /** Name of the parent table, if any */
  parent?: string;
  /** Names of the tables that depend on this table */
  relations: string[];
  /** Title of the table */
  title: string;
}

export interface PluginTableListItem {
  name: string;
  parent?: string;
  relations?: string[];
  relationTables: PluginTableListItem[];
  parentTable?: PluginTableListItem;
}

type Callback = (tableValues: Record<string, boolean>) => void;
type Unsubscribe = () => void;

export type SubscribeToTablesValueChange = (callback: Callback) => Unsubscribe;

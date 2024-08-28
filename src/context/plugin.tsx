import { createContext } from 'react';
import { PluginConfig } from '../types';
import { CloudQueryTables } from '../hooks';
import { generateTablesFromJson } from '../utils';
import { PluginTable } from '../components';

/**
 * @public
 */
export interface PluginContextProviderProps {
  config: PluginConfig;
  plugin: {
    name: string;
    kind: string;
    version: string;
    team: string;
  };
  teamName: string;
  tablesData?: CloudQueryTables;
  hideStepper: boolean;
  children: React.ReactNode;
}

interface PluginContextProps {
  config: PluginConfig;
  plugin: {
    name: string;
    kind: string;
    version: string;
    team: string;
  };
  teamName: string;
  hideStepper: boolean;
  tablesList?: PluginTable[];
}

/**
 * Shared/static plugin context.
 *
 * @public
 */
export const PluginContext = createContext<PluginContextProps>({
  config: {
    name: '',
    type: 'source' as PluginConfig['type'],
    label: '',
    docsLink: '',
    iconLink: '',
    steps: [],
    auth: [],
    guide: () => <></>,
  } as PluginConfig,
  plugin: {
    name: '',
    kind: '',
    version: '',
    team: '',
  },
  teamName: '',
  hideStepper: false,
  tablesList: undefined,
});

/**
 * Provider for shared/static plugin context.
 *
 * @public
 */
export const PluginContextProvider = ({
  children,
  config,
  plugin,
  teamName,
  tablesData,
  hideStepper,
}: PluginContextProviderProps) => {
  const tablesList = tablesData
    ? generateTablesFromJson(tablesData as CloudQueryTables)
    : undefined;

  return (
    <PluginContext.Provider value={{ config, plugin, teamName, tablesList, hideStepper }}>
      {children}
    </PluginContext.Provider>
  );
};

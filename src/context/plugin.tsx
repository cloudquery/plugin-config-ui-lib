import React, { createContext, useContext, useMemo } from 'react';

import { FormMessagePayload } from '@cloudquery/plugin-config-ui-connector';

import { PluginTable } from '../components';
import { CloudQueryTables } from '../hooks';
import { PluginConfig } from '../types';
import { generateTablesFromJson } from '../utils';
import { validateConfig } from './utils/validateConfig';

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
  pluginUiMessageHandler: any;
  initialValues?: FormMessagePayload['init']['initialValues'] | undefined;
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
  pluginUiMessageHandler: any;
  initialValues?: FormMessagePayload['init']['initialValues'] | undefined;
}

const PluginContext = createContext<PluginContextProps>({
  config: {
    name: '',
    type: 'source' as PluginConfig['type'],
    label: '',
    docsLink: '',
    iconLink: '',
    steps: [],
    auth: [],
    stateSchema: undefined,
    guide: () => <></>,
    errorCodes: {},
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
  pluginUiMessageHandler: undefined,
  initialValues: undefined,
});

/**
 * Shared/static plugin context.
 *
 * @public
 */
export const usePluginContext = () => useContext(PluginContext);

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
  pluginUiMessageHandler,
  initialValues,
}: PluginContextProviderProps) => {
  const tablesList = tablesData
    ? generateTablesFromJson(tablesData as CloudQueryTables)
    : undefined;

  const validatedConfig = useMemo(() => validateConfig(config), [config]);

  return (
    <PluginContext.Provider
      value={{
        config: validatedConfig,
        plugin,
        teamName,
        tablesList,
        hideStepper,
        pluginUiMessageHandler,
        initialValues,
      }}
    >
      {children}
    </PluginContext.Provider>
  );
};

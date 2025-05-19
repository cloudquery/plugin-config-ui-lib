import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { FormMessagePayload } from '@cloudquery/plugin-config-ui-connector';

import { PluginTable, Service } from '../components';
import { PluginConfig } from '../types';
import { generateTablesFromJson } from '../utils';
import { validateConfig } from './utils/validateConfig';
import { CloudQueryTables } from '../utils/generateTablesFromJson';
import { getPluginProps } from '../utils/getPluginProps';

/**
 * @public
 */
export interface PluginContextProviderProps {
  config: PluginConfig;
  teamName: string;
  getTablesData?: () => Promise<{ default: CloudQueryTables }>;
  getServicesData?: () => Promise<{ default: Service[] }>;
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
  servicesList?: Service[];
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
  servicesList: undefined,
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
  teamName,
  getTablesData,
  getServicesData,
  hideStepper,
  pluginUiMessageHandler,
  initialValues,
}: PluginContextProviderProps) => {
  const [tablesList, setTablesList] = useState<PluginTable[]>();
  useEffect(() => {
    getTablesData?.().then(({ default: tablesData }) => {
      setTablesList(generateTablesFromJson(tablesData));
    });
  }, [getTablesData]);

  const [servicesList, setServicesList] = useState<Service[]>();
  useEffect(() => {
    getServicesData?.().then(({ default: servicesData }) => {
      setServicesList(servicesData);
    });
  }, [getServicesData]);

  const validatedConfig = useMemo(
    () => validateConfig(config, tablesList, servicesList),
    [config, tablesList, servicesList],
  );

  const pluginProps = useMemo(() => getPluginProps(), []);

  return (
    <PluginContext.Provider
      value={{
        config: validatedConfig,
        plugin: pluginProps,
        teamName,
        tablesList,
        hideStepper,
        pluginUiMessageHandler,
        initialValues,
        servicesList,
      }}
    >
      {children}
    </PluginContext.Provider>
  );
};

import { PluginTable, Service } from '../components';

export function convertServicesToPluginTables(services: Service[]): PluginTable[] {
  return [...new Set(services.flatMap((service) => service.tables))].map((table) => ({
    name: table,
    description: '',
    is_incremental: false,
    relations: [],
    title: table,
  }));
}

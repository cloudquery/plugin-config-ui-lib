import YAML from 'yaml';

const exampleSourceConfig = YAML.stringify({
  kind: 'source',
  spec: {
    name: 'postgresql',
    path: 'cloudquery/postgresql',
    destinations: ['postgresql'],
    registry: 'cloudquery',
    version: 'v6.2.5',
    spec: {
      connection_string: 'test',
    },
  },
});

const exampleDestinationConfig = YAML.stringify({
  kind: 'destination',
  spec: {
    name: 'postgresql',
    path: 'cloudquery/postgresql',
    registry: 'cloudquery',
    version: 'v8.2.7',
    spec: {
      connection_string: 'test',
    },
  },
});

/**
 * Generate plugin configs for validation.
 *
 * @public
 */
export function generatePluginConfigs({
  pluginKind,
  pluginName,
  pluginLocalPath,
  spec,
}: {
  pluginKind: 'source' | 'destination';
  pluginName: string;
  pluginLocalPath?: string;
  spec: Record<string, any>;
}) {
  const pluginConfigSpec =
    pluginKind === 'source'
      ? {
          destinations: ['postgresql'],
          tables: spec.tables,
          skip_tables: spec.skip_tables,
        }
      : {
          write_mode: spec.write_mode,
          migrate_mode: spec.migrate_mode,
        };

  const pluginConfig = YAML.stringify({
    kind: pluginKind,
    spec: {
      name: pluginName,
      registry: 'local',
      path: pluginLocalPath || `../${pluginName}`,
      spec: spec.spec,
      ...pluginConfigSpec,
    },
  });

  const anotherPluginConfig =
    pluginKind === 'source' ? exampleDestinationConfig : exampleSourceConfig;

  return {
    pluginConfig,
    anotherPluginConfig,
    envs: spec.envs
      .map((env: { name: string; value: string }) => `${env.name}=${env.value}`)
      .join('\n'),
  };
}

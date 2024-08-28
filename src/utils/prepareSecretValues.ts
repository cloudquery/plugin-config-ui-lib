import { secretFieldValue } from './constants';

export function prepareSecretValues(values: Record<string, any>): {
  envs: { name: string; value: string }[];
  spec: Record<string, string>;
} {
  const envs = [];
  const spec: Record<string, string> = {};

  for (const name of values._secretKeys ?? []) {
    const value = values[name];
    if (value !== undefined) {
      envs.push({
        name,
        value: value === secretFieldValue ? '' : value,
      });
      spec[name] = `\${${name}}`;
    }
  }

  return {
    envs,
    spec,
  };
}

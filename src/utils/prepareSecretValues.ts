import { AuthType } from '../types';
import { secretFieldValue } from './constants';

/**
 * Prepare secret values for the deployment
 * ONLY valid if the form is using the "OTHER" auth type
 */
export function prepareSecretValues(values: Record<string, any>): {
  envs: { name: string; value: string }[];
  spec: Record<string, string>;
} {
  const envs = [];
  const spec: Record<string, string> = {};

  if (values._authType === AuthType.OTHER) {
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
  }

  return {
    envs,
    spec,
  };
}
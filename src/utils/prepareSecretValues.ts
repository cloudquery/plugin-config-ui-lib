import { escapeSingleQuotesAndBackslashes } from './escapeSingleQuotesAndBackslashes';
import { isOrHasSecret } from './secretValueHandling';
import { IterableStepComponent } from '../components/form/renderer/types';
import { PluginConfigFormStep } from '../types';

/**
 * Prepare secret values for the deployment
 */
export function prepareSecretValues(
  configSteps: PluginConfigFormStep[],
  values: Record<string, any>,
): {
  envs: { name: string; value: string }[];
  spec: Record<string, string | undefined>;
} {
  const envs: { name: string; value: string }[] = [];
  const spec: Record<string, string | undefined> = {};

  for (const name of values._secretKeys ?? []) {
    const shouldRenderFns = findShouldRenderFunctions(configSteps, name);
    const allVisible = shouldRenderFns.every((fn) => fn(values));
    const value = values[name];
    if (allVisible && value !== undefined) {
      envs.push({
        name,
        value: isOrHasSecret(value) ? '' : value,
      });
      spec[name] = `\${${escapeSingleQuotesAndBackslashes(name)}}`;
    } else {
      spec[name] = undefined;
    }
  }

  return {
    envs,
    spec,
  };
}

/**
 * Find all the shouldRender functions for a given field name
 */
export function findShouldRenderFunctions(
  configSteps: PluginConfigFormStep[],
  fieldName: string,
): Array<(formValues: any) => boolean> {
  const shouldRenderFunctions: Array<(formValues: any) => boolean> = [];

  function traverse(item: IterableStepComponent): any {
    if (typeof item.shouldRender === 'function') {
      shouldRenderFunctions.push(item.shouldRender);
    }

    if ('name' in item && item.name === fieldName) {
      return true;
    }

    if ('children' in item && Array.isArray(item.children)) {
      for (const child of item.children) {
        if (typeof child !== 'function' && traverse(child)) {
          return true;
        }
      }
    }

    if (typeof item.shouldRender === 'function') {
      shouldRenderFunctions.pop();
    }

    return false;
  }

  for (const step of configSteps) {
    for (const child of step.children) {
      if (typeof child !== 'function' && traverse(child)) {
        break;
      }
    }
  }

  return shouldRenderFunctions;
}

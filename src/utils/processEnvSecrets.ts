import { secretFieldValue } from './constants';

/**
 * readSecretsFromInitialValues util is designed to be used in a plugin's `prepareInitialValues` function.
 * It takes the default environment object and an array of API environment variables and returns a new object
 * This works well with the SecretInput component and it's counterpart utility writeSecretsToPrepareValues.
 *
 * @public
 * @deprecated - This is not used in the new pattern, but it must remain until all plugins are upgraded.
 * Then it should be deleted.
 */
export function readSecretsFromInitialValues<T extends object>(
  defaultEnv: T,
  apiEnv?: { name: string; value: string }[],
): T {
  let env = { ...defaultEnv } as T;

  for (const e of apiEnv ?? []) {
    if (env.hasOwnProperty(e.name)) {
      env = {
        ...env,
        [e.name]: secretFieldValue,
      };
    }
  }

  return env;
}

/**
 * writeSecretsToPrepareValues util is designed to be used in a plugin's `prepareSubmitValues` function.
 * It takes the form values and returns an array of API environment variables and a cleaned spec object.
 * This works well with the SecretInput component.
 *
 * @public
 * @deprecated - This is not used in the new pattern, but it must remain until all plugins are upgraded.
 * Then it should be deleted.
 */
export function writeSecretsToPrepareValues(env?: Record<string, string>): {
  envs: { name: string; value: string }[];
  spec: Record<string, string>;
} {
  const envs: { name: string; value: string }[] = [];
  const spec: Record<string, string> = {};

  for (const [name, value] of Object.entries(env || {})) {
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

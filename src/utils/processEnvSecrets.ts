import { secretFieldValue } from './constants';

/**
 * readSecretsFromInitialValues util is designed to be used in a plugin's `prepareInitialValues` function.
 * It takes the default environment object and an array of API environment variables and returns a new object
 * This works well with the SecretField component and it's counterpart utility writeSecretsToPrepareValues.
 *
 * @public
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
 * It takes an object of environment variables and returns an array of API environment variables and a cleaned spec object.
 * This works well with the SecretField component and it's counterpart utility readSecretsFromInitialValues.
 *
 * @public
 */
export function writeSecretsToPrepareValues(env?: Record<string, string>): {
  envs: { name: string; value: string }[];
  spec: Record<string, string>;
} {
  const envs = [];
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
import { envPlaceholder } from './constants';

const matchSecretsRegex = new RegExp(/\${[^}]+}/, 'g');

const getMatches = (value: string) => {
  return value.match(matchSecretsRegex);
};

export const isOrHasSecret = (value: string) => !!getMatches(value);

export const obfuscateSecretDisplay = (value: string) => {
  const matches = getMatches(value);

  if (matches) {
    if (matches[0].length === value.length) {
      return envPlaceholder;
    } else {
      return value.replace(matchSecretsRegex, envPlaceholder.slice(0, 6));
    }
  }

  return value;
};

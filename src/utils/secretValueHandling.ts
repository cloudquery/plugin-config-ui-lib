import { envPlaceholder } from './constants';

const matchSecretsRegex = new RegExp(/\${[^}]+}/, 'g');

const getMatches = (value: string) => {
  return value.match(matchSecretsRegex);
};

export const isOrHasSecret = (value: string) => !!getMatches(value);

export const obfuscateSecretDisplay = (value: string) => {
  const matches = getMatches(value);

  if (matches) {
    return matches[0].length === value.length
      ? envPlaceholder
      : value.replace(matchSecretsRegex, envPlaceholder.slice(0, 6));
  }

  return value;
};

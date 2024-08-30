import { PluginConfig } from '../types';

const defaultErrorCodes = {
  // TODO: populate as common error codes arise
};

export function parseTestConnectionError(error: Error & { code?: string }, config: PluginConfig) {
  const errorCodes = config.errorCodes
    ? { ...defaultErrorCodes, ...config.errorCodes }
    : defaultErrorCodes;

  return {
    ...error,
    message: errorCodes[error.code as keyof typeof errorCodes] || error.message || 'Unknown error',
  };
}

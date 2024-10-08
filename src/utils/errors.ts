/**
 * Generate abort error
 *
 * @public
 */
export function generateApiAbortError(message?: string) {
  const error = new Error(message || 'AbortError');
  error.name = 'AbortError';

  return error;
}

/**
 * Check if error is an abort error
 *
 * @public
 */
export function isApiAbortError(error: Error) {
  return error.name === 'AbortError';
}

/**
 * Escape single quotes or backslashes so a string can be safely interpolated.
 *
 * @param str - a string
 * @public
 */
export function escapeSingleQuotesAndBackslashes(str: string) {
  return str.replaceAll('\\', '\\\\').replaceAll("'", String.raw`\'`);
}

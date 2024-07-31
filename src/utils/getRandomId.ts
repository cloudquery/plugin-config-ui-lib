/**
 * Generate random ID with optional length (7 by default, 36 is maximum)
 *
 * @public
 */
export function getRandomId(length = 7) {
  return Math.random().toString(36).slice(length);
}

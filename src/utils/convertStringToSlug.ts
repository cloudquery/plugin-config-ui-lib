/**
 * Converts an arbitrary string to a valid slug
 *
 * @param value - string argument to be converted to a slug
 * @public
 */
export function convertStringToSlug(value: string) {
  let slug = value
    .toLowerCase()
    .replaceAll(/[^\da-z-]+/g, '-')
    .replaceAll(/-{2,}/g, '-')
    .replaceAll(/^-+|-+$/g, '');

  if (!/^[a-z]/.test(slug)) {
    slug = `a${slug}`;
  }

  return slug;
}

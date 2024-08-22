/**
 * Generate display name for the sync source/destination based on the plugin display name
 *
 * @param pluginDisplayName - display name of the plugin
 * @public
 */
export function generateDisplayName(pluginDisplayName: string) {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return `${pluginDisplayName} ${year}-${month}-${day}`;
}

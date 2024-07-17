/**
 * Generate name for the sync source/destination based on the plugin name
 *
 * @param pluginName - name of the plugin
 * @public
 */
export function generateName(pluginName: string) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth().toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return `${pluginName}-${year}-${month}-${day}`;
}

/**
 * Generate name for the sync source/destination based on the plugin name
 *
 * @param pluginName - name of the plugin
 * @public
 */
export function generateUniqueName(pluginName: string) {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const hour = today.getHours().toString().padStart(2, '0');
  const minutes = today.getMinutes().toString().padStart(2, '0');
  const seconds = today.getSeconds().toString().padStart(2, '0');

  return `${pluginName}-${[year, month, day, hour, minutes, seconds].join('-')}`;
}

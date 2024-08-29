/**
 * Generate name for the sync source/destination based on the plugin name
 *
 * @param pluginName - name of the plugin
 * @public
 * @deprecated After introduction of generateDisplayName, this should be replaced with generateUniqueName
 */
export function generateName(pluginName: string) {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return `${pluginName}-${year}-${month}-${day}`;
}

export function getPluginProps() {
  if (
    !process.env.REACT_APP_PLUGIN_TEAM ||
    !process.env.REACT_APP_PLUGIN_KIND ||
    !process.env.REACT_APP_PLUGIN_NAME ||
    !process.env.REACT_APP_PLUGIN_VERSION
  ) {
    throw new Error('Plugin environment variables are not set');
  }

  return {
    team: process.env.REACT_APP_PLUGIN_TEAM,
    kind: process.env.REACT_APP_PLUGIN_KIND,
    name: process.env.REACT_APP_PLUGIN_NAME,
    version: process.env.REACT_APP_IS_PREVIEW
      ? (window as any).REACT_APP_PLUGIN_VERSION || process.env.REACT_APP_PLUGIN_VERSION
      : process.env.REACT_APP_PLUGIN_VERSION,
  };
}

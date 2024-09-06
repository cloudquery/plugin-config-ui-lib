export const errorMessages = {
  no_component: 'PluginConfig step sections must have a `component` property',
  no_title: 'PluginConfig step sections must have a `title` property',
  no_children: 'PluginConfig step sections must have a `children` property',
  no_name:
    'PluginConfig step sections components must have a `name` property. It is used as a unique identifier for the yup form validation.',
  no_label:
    'PluginConfig step sections components must have a `label` property. It is used as a display label for the form field.',
  no_schema:
    'PluginConfig step sections components must have a `schema` property. It is used as a definition of the yup schema validation for the form field.',
  config_no_name: 'Please provide a PluginConfig `name` to the PluginContextProvider',
  config_no_config: 'Please provide a PluginConfig to the PluginContextProvider',
  config_no_type: 'Only `source` and `destination` are valid PluginConfig types.',
  config_no_label: 'Please provide a PluginConfig `label` to the PluginContextProvider',
  config_no_docs:
    'Please provide a PluginConfig `docsLink` to the PluginContextProvider. Example: `https://hub.cloudquery.io/plugins/destination/cloudquery/mysql/latest/docs`',
  config_no_icon:
    'Please provide a PluginConfig `iconLink` to the PluginContextProvider. Example: `images/logo.webp`',
  config_no_steps:
    'Please provide a PluginConfig `steps` to the PluginContextProvider as an array of `Sections`. Steps are responsible for the React layout of your form, as well as form validation.',
  config_bad_state_schema:
    'stateSchema is optional. But they can only be an object of string-keyed yup.AnySchema.',
  config_no_auth:
    'Please provide a PluginConfig `auth` to the PluginContextProvider. Options are [AuthType.OAUTH, AuthType.OTHER]. An array with both values is acceptable.',
  config_no_guide: 'Please provide a PluginConfig `guide` to the PluginContextProvider.',
  config_bad_error_codes:
    'Error codes are optional. But they can only be an object of string-keyed strings.',
  reserved_name: 'This is a reserved name. Please use a different identifier for your form field',
  duplicate_names:
    'These form field names have been defined more than once. Form field names can only be used a single time.',
};

export const reservedNames = [
  'tables',
  'displayName',
  'name',
  'connectorId',
  '_secretKeys',
  '_editMode',
  '_authType',
  '_step',
];

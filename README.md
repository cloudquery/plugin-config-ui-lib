# @cloudquery/plugin-config-ui-lib

A comprehensive library for building CloudQuery plugin configuration UIs with minimal effort.

## Quick Start

The fastest way to create a new plugin UI is to use the CLI generator:

```bash
npx --legacy-peer-deps @cloudquery/plugin-config-ui-lib
```

This command runs the interactive generator that creates a complete plugin UI project with all necessary files and dependencies.

## Generator Features

The generator will prompt you for:

- **Plugin Label**: The human-readable name (e.g., "AWS", "GitHub")
- **Plugin Name**: The machine-readable name (e.g., "aws", "github")
- **Plugin Kind**: Source or destination
- **Plugin Team**: Typically "cloudquery" or your organization
- **Plugin Version**: The semantic version (e.g., "v1.0.0")
- **Plugin Logo**: Path to your logo image (optional but recommended)
- **Table Selection**: For source plugins, whether it supports table selection
- **Service Selection**: For source plugins, whether it supports service selection
- **Authentication Type**: OAuth, token-based, or both
- **Authentication Properties**: For token-based auth, what fields are needed
- **Advanced Options**: Additional configuration options

After answering these questions, the generator creates a complete UI project in a `cloud-config-ui` directory with:

- All necessary configuration files
- Basic UI components
- Proper authentication flows
- Unit test setup
- Development environment

## Core Components

### useFormInit hook

Initializes the form with values from CloudQuery:

```tsx
const { initialValues, initialized, teamName, context, isDisabled } = 
  useFormInit(pluginUiMessageHandler);
```

### PluginContextProvider

The main wrapper component that provides context to all child components:

```tsx
<PluginContextProvider
  config={config}
  teamName={teamName}
  getTablesData={getTablesData}
  hideStepper={context === 'wizard'} 
  pluginUiMessageHandler={pluginUiMessageHandler}
  initialValues={initialValues}
  isDisabled={isDisabled}
>
  {/* Your plugin UI components */}
</PluginContextProvider>
```

### ConfigUIForm

The main form component that handles the entire UI:

```tsx
<ConfigUIForm 
  container={container} 
  prepareSubmitValues={prepareSubmitValues} 
/>
```

Should be rendered only when `initialized` is `true`.

### useConfig hook

Defines your plugin's configuration structure, including authentication methods, steps, and form fields:

```tsx
export const useConfig = ({ initialValues }) => ({
  name: 'my-plugin',
  type: 'source',
  label: 'My Plugin',
  docsLink: 'https://hub.cloudquery.io/plugins/source/myteam/my-plugin/latest/docs',
  iconLink: 'images/logo.png',
  auth: [AuthType.OAUTH, AuthType.OTHER],
  steps: [
    {
      title: 'Connect',
      children: [
        // Form sections and components
      ]
    }
  ],
  // Optional guide configuration
  guide: { /* guide configuration */ }
});
```

## UI Components

### Form Components

- **ControlTextField**: Text input with validation
- **ControlNumberField**: Number input with validation
- **ControlSelect**: Dropdown selection
- **ControlSwitch**: Toggle switch
- **ControlPassword**: Password input with visibility toggle
- **ControlCheckbox**: Checkbox input

### Input Components

- **TableSelector**: UI for selecting tables (for source plugins)
- **ServiceSelector**: UI for selecting services
- **SecretInput**: Secure input for credentials
- **UploadJSON**: Component for uploading JSON files
- **MultiAutocomplete**: Multiple selection with autocomplete

## Customization

### Form Structure

You can customize the form by defining sections and components in the `useConfig` hook:

```tsx
{
  component: 'section',
  title: 'Authentication',
  children: [
    {
      component: 'control-text-field',
      name: 'api_key',
      label: 'API Key',
      required: true
    }
  ]
}
```

### Conditional Rendering

You can conditionally show sections or fields:

```tsx
{
  component: 'section',
  title: 'Advanced Settings',
  shouldRender: (values) => values.show_advanced === true,
  children: [/* components */]
}
```

### Custom Validation

Use Yup schemas for validation:

```tsx
{
  component: 'control-text-field',
  name: 'api_key',
  label: 'API Key',
  schema: yup.string().when('_step', {
    // Only validate on step 1
    is: 1,
    then: (schema) => schema.required('API Key is required')
  })
}
```

## Development

After generating your UI:

```bash
cd cloud-config-ui
npm start
```

This starts a development server where you can test your plugin UI locally.

## Testing

The generator includes unit tests:

```bash
npm run test
```

or in watch mode

```bash
npm run test:watch
```

## Building for Production

```bash
npm run build
```

This creates optimized production files in the `dist` directory that can be deployed to CloudQuery.
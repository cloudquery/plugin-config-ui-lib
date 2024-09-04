# @cloudquery/plugin-config-ui-lib

Plugin Config UI library for CloudQuery Plugin Config UI

## Description

`@cloudquery/plugin-config-ui-lib` is a library that provides various utilities that can be used in CloudQuery Plugin Config UI.

## Installation

To install the library, you can use npm:

```bash
npm install @cloudquery/plugin-config-ui-lib
```

## Documentation

### Hooks

#### useApiCall

This hook is used to make API calls that require Authentication header from CloudQuery Cloud App.

```tsx
const { callApi } = useApiCall(pluginUiMessageHandler);

callApi('https://api.cloudquery.io', 'POST', { name: 'my-source' });
```

#### useFormActions

This hook is used export data and functions that can be used in the footer for plugin UI.

```tsx
const formActions = useFormActions({
  pluginUiMessageHandler,
  teamName: 'my-team',
  pluginTeamName: 'cloudquery',
  pluginName: 'postgresql',
  pluginKind: 'source',
  getValues;
  pluginVersion: '1.0.0',
  isUpdating: false,
});

return <FormFooter {...formActions} />;
```

#### useFormCurrentValues

This hook is used to respond to request for current values from CloudQuery Cloud App.

```tsx
useFormCurrentValues({
  pluginUiMessageHandler,
  getCurrentValues,
});
```

#### useFormHeightChange

This hook is used to automatically detect the changes of the height of the form container and notify CloudQuery Cloud App about those.
The hooks returns the React Ref object that should reference the HTML element that represents the form container.

```tsx
useFormHeightChange(pluginUiMessageHandler);
```

#### useFormInit

This hook is used get the initial values for the form from the CloudQuery Cloud App.
The initial values can be undefined, therefore the hook also returns information whether
it was initialized.

```tsx
const { initialized, initialValues } = useFormInit(pluginUiMessageHandler, false);

if (!initialized) {
  return null;
}

return (
  <div>
    <form>
      <input type="text" value={initialValues.name} />
    </form>
  </div>
);
```

#### useFormSubmit

This hook is used to handle the submit event for the form from the CloudQuery Cloud App.
It requires the function that should validate the data and return an object either with
`errors` or `values` depending on the validation result. The function can also return
a Promise of the same type.

```tsx
const [name, setName] = useState('');
const handleValidate = () => {
  if (!name.trim()) {
    return { errors: { name: 'Name is required' } };
  }

  return { values: { name } };
};

useFormSubmit(handleValidate);

return <input type="text" value={name} onChange={(event) => setName(event.target.value)} />;
```

## Development

### Building the Library

To build the library, run:

```bash
npm run build
```

### Running Tests

To run the test suite, execute:

```bash
npm test
```

## Contributing

If you encounter any issues or have feature requests, please feel free to open an issue on the [GitHub repository](https://github.com/cloudquery/plugin-config-ui-lib/issues).

## License

This project is licensed under the [Mozilla Public License.](LICENSE).

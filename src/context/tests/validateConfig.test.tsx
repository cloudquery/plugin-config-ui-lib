import { PluginConfig } from '../../types';
import { validateConfig } from '../utils/validateConfig';
import validConfig from './data/valid-config';
import { errorMessages } from '../utils/constants';

describe('validateConfig', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  // Restore console.error after tests
  afterAll(() => {
    console.error = originalError;
  });

  test('should validate a valid config', async () => {
    const config = validateConfig(validConfig);

    expect(config).toMatchObject(validConfig);
  });

  test('should throw an error if config is missing the `name` property', async () => {
    const { name: _, ...rest } = validConfig;

    const runTest = () => validateConfig(rest as any);

    expect(runTest).toThrow(errorMessages.config_no_name);
  });

  test('should throw an error if config is missing the `label` property', async () => {
    const { label: _, ...rest } = validConfig;

    const runTest = () => validateConfig(rest as any);

    expect(runTest).toThrow(errorMessages.config_no_label);
  });

  test('should throw an error if config is missing the `label` property', async () => {
    const { label: _, ...rest } = validConfig;

    const runTest = () => validateConfig(rest as any);

    expect(runTest).toThrow(errorMessages.config_no_label);
  });

  test('should throw an error if config is missing the `guide` property', async () => {
    const { guide: _, ...rest } = validConfig;

    const runTest = () => validateConfig(rest as any);

    expect(runTest).toThrow(errorMessages.config_no_guide);
  });

  test('should throw an error if config is missing the `type` property', async () => {
    const { type: _, ...rest } = validConfig;

    const runTest = () => validateConfig(rest as any);

    expect(runTest).toThrow(errorMessages.config_no_type);
  });

  test('should throw an error if config is missing the `docs` property', async () => {
    const { docsLink: _, ...rest } = validConfig;

    const runTest = () => validateConfig(rest as any);

    expect(runTest).toThrow(errorMessages.config_no_docs);
  });

  test('should throw an error if config is missing the `icon` property', async () => {
    const { iconLink: _, ...rest } = validConfig;

    const runTest = () => validateConfig(rest as any);

    expect(runTest).toThrow(errorMessages.config_no_icon);
  });

  test('should throw an error if config is missing the `steps` property', async () => {
    const { steps: _, ...rest } = validConfig;

    const runTest = () => validateConfig(rest as any);

    expect(runTest).toThrow(errorMessages.config_no_steps);
  });

  test('should throw an error if config is missing the `auth` property', async () => {
    const { auth: _, ...rest } = validConfig;

    const runTest = () => validateConfig(rest as any);

    expect(runTest).toThrow(errorMessages.config_no_auth);
  });

  test('should throw an error if config has an incorrect `errorCodes` property', async () => {
    const runTest = () => validateConfig({ ...validConfig, errorCodes: 'string' } as any);

    expect(runTest).toThrow(errorMessages.config_bad_error_codes);
  });

  test('should throw an error if config has an incorrect `stateSchema` property', async () => {
    const runTest = () => validateConfig({ ...validConfig, stateSchema: 'string' } as any);

    expect(runTest).toThrow(errorMessages.config_bad_state_schema);
  });

  test('should throw an error if config `steps` property is not an array', async () => {
    const runTest = () => validateConfig({ ...validConfig, steps: {} } as any);

    expect(runTest).toThrow(errorMessages.config_no_steps);
  });

  test('should throw an error if config `steps` children do not have children', async () => {
    const runTest = () => validateConfig({ ...validConfig, steps: [{}] } as any);

    expect(runTest).toThrow(errorMessages.no_children);
  });

  test('should throw an error if section children are empty objects', async () => {
    const runTest = () =>
      validateConfig({
        ...validConfig,
        steps: [
          {
            component: 'section',
            children: [{}],
          },
        ],
      } as any);

    expect(runTest).toThrow(errorMessages.no_component);
  });

  test('should throw an error if section children components do not have a schema property', async () => {
    const runTest = () =>
      validateConfig({
        ...validConfig,
        steps: [
          {
            component: 'section',
            children: [
              {
                component: 'control-text-field',
                name: 'field',
                label: 'Name',
              },
            ],
          },
        ],
      } as any);

    expect(runTest).toThrow(errorMessages.no_schema);
  });

  test('should throw an error if section children components do not have a label property', async () => {
    const runTest = () =>
      validateConfig({
        ...validConfig,
        steps: [
          {
            component: 'section',
            children: [
              {
                component: 'control-text-field',
                name: 'field',
                schema: () => {},
              },
            ],
          },
        ],
      } as any);

    expect(runTest).toThrow(errorMessages.no_label);
  });

  test('should throw an error if section children components do not have a name property', async () => {
    const runTest = () =>
      validateConfig({
        ...validConfig,
        steps: [
          {
            component: 'section',
            children: [
              {
                component: 'control-text-field',
                label: 'Name',
                schema: () => {},
              },
            ],
          },
        ],
      } as any);

    expect(runTest).toThrow(errorMessages.no_name);
  });

  test('should throw an error if section children components do not have a name property', async () => {
    const runTest = () =>
      validateConfig({
        ...validConfig,
        steps: [
          {
            component: 'section',
            children: [
              {
                component: 'control-text-field',
                name: 'name',
                label: 'Name',
                schema: () => {},
              },
            ],
          },
        ],
      } as any);

    expect(runTest).toThrow(errorMessages.reserved_name);
  });

  test('should throw an error if section children components share a name property', async () => {
    const runTest = () =>
      validateConfig({
        ...validConfig,
        steps: [
          {
            component: 'section',
            children: [
              {
                component: 'control-text-field',
                name: 'field',
                label: 'Name',
                schema: () => {},
              },
            ],
          },
          {
            component: 'section',
            children: [
              {
                component: 'sub-section',
                title: 'hello',
                children: [
                  {
                    component: 'control-text-field',
                    name: 'field',
                    label: 'Name',
                    schema: () => {},
                  },
                ],
              },
            ],
          },
        ],
      } as any);

    expect(runTest).toThrow(errorMessages.duplicate_names);
  });

  test('should throw an error if non-empty table list is provided but no table selector is present', async () => {
    const runTest = () =>
      validateConfig(
        {
          ...validConfig,
          steps: [
            {
              component: 'section',
              children: [],
            },
          ],
        } as any,
        [
          {
          name: 'example-table',
          title: 'Example Table',
          description: 'Example Table Description',
          relations: [],
          is_incremental: false,
        },
      ]);

    expect(runTest).toThrow(errorMessages.config_no_table_selector);
  });
});

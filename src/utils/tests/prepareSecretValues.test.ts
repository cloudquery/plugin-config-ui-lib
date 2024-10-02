import { PluginConfigFormStep } from '../../types';
import { yup } from '../getYupValidationResolver';
import { findShouldRenderFunctions, prepareSecretValues } from '../prepareSecretValues';

describe('prepareSecretValues', () => {
  const newSecret = 'secret_two';
  const values = {
    SECRET_ONE: '${password}',
    SECRET_TWO: newSecret,
    NOT_A_SECRET: 'abc',
    _secretKeys: ['SECRET_ONE', 'SECRET_TWO'],
  };

  const mockConfigSteps: PluginConfigFormStep[] = [
    {
      title: 'Test Step',
      children: [
        {
          name: 'SECRET_ONE',
          shouldRender: () => true,
          component: () => null,
          schema: yup.object().shape({
            SECRET_ONE: yup.string().required(),
          }),
        },
        {
          name: 'SECRET_TWO',
          shouldRender: () => true,
          component: () => null,
          schema: yup.object().shape({
            SECRET_TWO: yup.string().required(),
          }),
        },
      ],
    },
  ];

  it('should return an envs array and spec object with all existing properties equal to the secret placeholder', () => {
    const result = prepareSecretValues(mockConfigSteps, values);

    expect(result.envs).toMatchObject([
      {
        name: 'SECRET_ONE',
        value: '',
      },
      {
        name: 'SECRET_TWO',
        value: newSecret,
      },
    ]);

    expect(result.spec).toMatchObject({
      SECRET_ONE: '${SECRET_ONE}',
      SECRET_TWO: '${SECRET_TWO}',
    });
  });

  it('should not include secrets when shouldRender returns false', () => {
    const mockConfigStepsWithFalseRender: PluginConfigFormStep[] = [
      {
        title: 'Test Step',
        children: [
          {
            name: 'SECRET_ONE',
            shouldRender: () => false,
            component: () => null,
            schema: yup.object().shape({
              SECRET_ONE: yup.string().required(),
            }),
          },
          {
            name: 'SECRET_TWO',
            shouldRender: () => true,
            component: () => null,
            schema: yup.object().shape({
              SECRET_TWO: yup.string().required(),
            }),
          },
        ],
      },
    ];

    const result = prepareSecretValues(mockConfigStepsWithFalseRender, values);

    expect(result.envs).toMatchObject([
      {
        name: 'SECRET_TWO',
        value: newSecret,
      },
    ]);

    expect(result.spec).toMatchObject({
      SECRET_TWO: '${SECRET_TWO}',
    });
  });

  it('should not include undefined values', () => {
    const valuesWithUndefined = {
      ...values,
      SECRET_ONE: undefined,
    };

    const result = prepareSecretValues(mockConfigSteps, valuesWithUndefined);

    expect(result.envs).toMatchObject([
      {
        name: 'SECRET_TWO',
        value: newSecret,
      },
    ]);

    expect(result.spec).toMatchObject({
      SECRET_TWO: '${SECRET_TWO}',
    });
  });
});

describe('findShouldRenderFunctions', () => {
  it('should return an empty array if no shouldRender functions are found', () => {
    const result = findShouldRenderFunctions(
      [
        {
          title: 'abc',
          children: [],
        },
      ],
      'SECRET_ONE',
    );

    expect(result).toMatchObject([]);
  });

  it('should return an array of shouldRender functions', () => {
    const shouldRender1 = jest.fn();
    const shouldRender2 = jest.fn();
    const result = findShouldRenderFunctions(
      [
        {
          title: 'abc',
          children: [
            {
              name: 'SECRET_ONE',
              shouldRender: shouldRender1,
              component: () => null,
              schema: yup.object().shape({
                SECRET_ONE: yup.string().required(),
              }),
            },
          ],
        },
      ],
      'SECRET_ONE',
    );

    expect(result).toMatchObject([shouldRender1]);
  });

  it('should return an array of shouldRender functions (nested)', () => {
    const shouldRender1 = jest.fn();
    const shouldRender2 = jest.fn();
    const shouldRender3 = jest.fn();
    const shouldRender4 = jest.fn();
    const shouldRender5 = jest.fn();
    const shouldRender6 = jest.fn();
    const shouldRender7 = jest.fn();
    const result = findShouldRenderFunctions(
      [
        {
          title: 'abc',
          children: [
            {
              shouldRender: shouldRender1,
              component: 'section',
              children: [],
            },
            {
              shouldRender: shouldRender2,
              component: 'section',
              children: [
                {
                  shouldRender: shouldRender3,
                  component: 'section',
                  children: [
                    {
                      shouldRender: shouldRender4,
                      component: 'section',
                      children: [
                        {
                          name: 'SECRET_FIVE',
                          shouldRender: shouldRender5,
                          component: 'control-select-field',
                          label: 'SECRET_FIVE',
                          options: [],
                          schema: yup.object().shape({
                            SECRET_FIVE: yup.string().required(),
                          }),
                        },
                        {
                          name: 'SECRET_SIX',
                          shouldRender: shouldRender6,
                          component: 'control-select-field',
                          label: 'SECRET_SIX',
                          options: [],
                          schema: yup.object().shape({
                            SECRET_SIX: yup.string().required(),
                          }),
                        },
                      ],
                    },
                    {
                      name: 'SECRET_SEVEN',
                      shouldRender: shouldRender7,
                      component: 'control-select-field',
                      label: 'SECRET_SEVEN',
                      options: [],
                      schema: yup.object().shape({
                        SECRET_SEVEN: yup.string().required(),
                      }),
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      'SECRET_SEVEN',
    );

    expect(result).toMatchObject([
      shouldRender2,
      shouldRender3,
      shouldRender7,
    ]);
  });
});

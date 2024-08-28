import { secretFieldValue } from '../constants';
import { prepareSecretValues } from '../prepareSecretValues';

describe('prepareSecretValues', () => {
  const newSecret = 'secret_two';
  const values = {
    SECRET_ONE: secretFieldValue,
    SECRET_TWO: newSecret,
    NOT_A_SECRET: 'abc',
    _secretKeys: ['SECRET_ONE', 'SECRET_TWO'],
  };

  it('should return an env file with all existing properties equal to the secret placeholder', () => {
    const result = prepareSecretValues(values);

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
});

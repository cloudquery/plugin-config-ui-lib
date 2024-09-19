import { AuthType } from '../../types';
import { prepareSecretValues } from '../prepareSecretValues';

describe('prepareSecretValues', () => {
  const newSecret = 'secret_two';
  const values = {
    SECRET_ONE: '${password}',
    SECRET_TWO: newSecret,
    NOT_A_SECRET: 'abc',
    _secretKeys: ['SECRET_ONE', 'SECRET_TWO'],
  };

  it('should return an envs array and spec object with all existing properties equal to the secret placeholder', () => {
    const result = prepareSecretValues({ ...values, _authType: AuthType.OTHER });

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

  it('should return an env empty array and spec empty object', () => {
    const result = prepareSecretValues({ ...values, _authType: AuthType.OAUTH });

    expect(result.envs).toMatchObject([]);

    expect(result.spec).toMatchObject({});
  });
});

import { secretFieldValue } from '../constants';
import { readSecretsFromInitialValues, writeSecretsToPrepareValues } from '../processEnvSecrets';

describe('readSecretsFromInitialValues', () => {
  const defaultEnv = {
    SECRET_ONE: 'secret_one',
    SECRET_TWO: 'secret_two',
  };

  it('should return an env file with only existing properties equal to the secret placeholder', () => {
    const result1 = readSecretsFromInitialValues(defaultEnv, [{ name: 'SECRET_ONE', value: '' }]);

    expect(result1).toMatchObject({
      SECRET_ONE: secretFieldValue,
    });

    const result2 = readSecretsFromInitialValues(defaultEnv, [
      { name: 'SECRET_ONE', value: '' },
      { name: 'SECRET_TWO', value: '' },
    ]);

    expect(result2).toMatchObject({
      SECRET_ONE: secretFieldValue,
      SECRET_TWO: secretFieldValue,
    });
  });
});

describe('writeSecretsToPrepareValues', () => {
  const newSecret = 'secret_two';
  const values = {
    SECRET_ONE: secretFieldValue,
    SECRET_TWO: newSecret,
    NOT_A_SECRET: 'abc',
    _secretKeys: ['SECRET_ONE', 'SECRET_TWO'],
  };

  it('should return an env file with all existing properties equal to the secret placeholder', () => {
    const result = writeSecretsToPrepareValues(values);

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

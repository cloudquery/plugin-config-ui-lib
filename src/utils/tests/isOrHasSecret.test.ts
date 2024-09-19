import { envPlaceholder } from '../constants';
import { isOrHasSecret, obfuscateSecretDisplay } from '../secretValueHandling';

describe('isOrHasSecret', () => {
  it('should return false when the value string does not include any interpolated secrets', () => {
    expect(isOrHasSecret('aws')).toBeFalsy();
  });

  it('should return false when the value string is not a secret', () => {
    expect(isOrHasSecret('${')).toBeFalsy();
    expect(isOrHasSecret('{}')).toBeFalsy();
    expect(isOrHasSecret('}')).toBeFalsy();
    expect(isOrHasSecret('$}')).toBeFalsy();
  });
});

describe('obfuscateSecretDisplay', () => {
  it('should return true when the value string includes an interpolated secret', () => {
    expect(obfuscateSecretDisplay('aws${password}def')).toBe('aws******def');
  });

  it('should return true when the value string includes interpolated secrets', () => {
    expect(obfuscateSecretDisplay('aws${password}def${token}.')).toBe('aws******def******.');
  });

  it('should return true when the value string is a secret', () => {
    expect(obfuscateSecretDisplay('${token}')).toBe(envPlaceholder);
  });
});

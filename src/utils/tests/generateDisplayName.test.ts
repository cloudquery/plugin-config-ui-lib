import { generateDisplayName } from '../generateDisplayName';

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2020, 3, 1));
});

describe('generateDisplayName', () => {
  it('should generate the correct name based on the plugin name', () => {
    // Test case 1: pluginName with spaces
    expect(generateDisplayName('aws')).toBe('aws 2020-04-01');
    expect(/^[A-Za-z][\w '-]*$/.test(generateDisplayName('aws'))).toBeTruthy();
  });
});

afterAll(() => {
  jest.useRealTimers();
});

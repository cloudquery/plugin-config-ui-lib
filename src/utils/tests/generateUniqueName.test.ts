import { generateUniqueName } from '../generateUniqueName';

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2020, 3, 1, 5, 15, 30));
});

describe('generateUniqueName', () => {
  it('should generate the correct name based on the plugin name', () => {
    const name = generateUniqueName('aws');

    expect(name).toBe('aws-2020-04-01-05-15-30');
  });
});

afterAll(() => {
  jest.useRealTimers();
});

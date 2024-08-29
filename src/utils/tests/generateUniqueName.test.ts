import { generateUniqueName } from '../generateUniqueName';

beforeAll(() => {
  jest.useFakeTimers();
  jest.setSystemTime(new Date(2020, 3, 1, 5, 15, 30));
});

describe('generateUniqueName', () => {
  it('should generate the correct name based on the plugin name', () => {
    const name = generateUniqueName('aws');

    expect(name).toMatch(/^aws-2020-04-01-05-15-30/);
    expect(name.length).toBe(27);
  });
});

afterAll(() => {
  jest.useRealTimers();
});

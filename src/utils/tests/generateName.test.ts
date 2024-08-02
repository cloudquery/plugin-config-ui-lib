import { generateName } from '../generateName';

beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(2020, 3, 1));
});

describe('generateName', () => {
    it('should generate the correct name based on the plugin name', () => {
        // Test case 1: pluginName with spaces
        expect(generateName('aws')).toBe('aws-2020-04-01');
    });
});

afterAll(() => {
    jest.useRealTimers();
});
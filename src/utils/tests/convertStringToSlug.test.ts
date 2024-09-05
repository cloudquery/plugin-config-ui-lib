import { convertStringToSlug } from '../convertStringToSlug';

describe('convertStringToSlug', () => {
  it('should generate the correct slug based on the input string', () => {
    // Test case 1: already slug
    expect(convertStringToSlug('test-slug')).toBe('test-slug');
    // Test case 1: uppercase
    expect(convertStringToSlug('Test')).toBe('test');
    // Test case 1: with spaces
    expect(convertStringToSlug('Test Slug')).toBe('test-slug');
    // Test case 1: only numeric
    expect(convertStringToSlug('1234')).toBe('a1234');
  });
});

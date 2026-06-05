import { firstCommaSeparatedValue } from './firstCommaSeparatedValue.mjs';

describe('firstCommaSeparatedValue', () => {
  it('should return null when the value is undefined', () => {
    expect(firstCommaSeparatedValue(undefined)).toBeNull();
  });

  it('should return the value when it does not contain commas', () => {
    expect(firstCommaSeparatedValue('203.0.113.10')).toBe('203.0.113.10');
  });

  it('should return the first value when it contains commas', () => {
    expect(firstCommaSeparatedValue('203.0.113.10, 198.51.100.5')).toBe('203.0.113.10');
  });

  it('should trim whitespace from the first value', () => {
    expect(firstCommaSeparatedValue(' 203.0.113.10 , 198.51.100.5')).toBe('203.0.113.10');
  });

  it('should return null when the first value is empty', () => {
    expect(firstCommaSeparatedValue(', 198.51.100.5')).toBeNull();
  });

  it('should return null when the first value is blank', () => {
    expect(firstCommaSeparatedValue('   , 198.51.100.5')).toBeNull();
  });
});

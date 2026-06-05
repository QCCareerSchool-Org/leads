import { firstHeaderValue } from './firstHeaderValue.mjs';

describe('firstHeaderValue', () => {
  it('should return undefined when the header value is undefined', () => {
    expect(firstHeaderValue(undefined)).toBeUndefined();
  });

  it('should return the header value when it is a string', () => {
    expect(firstHeaderValue('203.0.113.10')).toBe('203.0.113.10');
  });

  it('should return the first header value when it is an array', () => {
    expect(firstHeaderValue([ '203.0.113.10', '198.51.100.5' ])).toBe('203.0.113.10');
  });

  it('should return undefined when the header value is an empty array', () => {
    expect(firstHeaderValue([])).toBeUndefined();
  });
});

import { formatTelephoneNumber } from './formatTelephoneNumber.mjs';

describe('formatTelephoneNumber', () => {
  it('should format a national number with the supplied country code', () => {
    expect(formatTelephoneNumber(1, '(613) 555-1212')).toBe('+16135551212');
  });

  it('should not duplicate the supplied country code', () => {
    expect(formatTelephoneNumber(1, '1 (613) 555-1212')).toBe('+16135551212');
  });

  it('should prefer a complete international number with a plus sign', () => {
    expect(formatTelephoneNumber(1, '+44 20 7946 0018')).toBe('+442079460018');
  });

  it('should format a number with an international dialing prefix', () => {
    expect(formatTelephoneNumber(1, '00 44 20 7946 0018')).toBe('+442079460018');
    expect(formatTelephoneNumber(1, '011 44 20 7946 0018')).toBe('+442079460018');
  });

  it('should remove extensions', () => {
    expect(formatTelephoneNumber(1, '(613) 555-1212 ext. 123')).toBe('+16135551212');
  });

  it('should remove a national trunk prefix for countries where it is not part of E.164', () => {
    expect(formatTelephoneNumber(44, '020 7946 0018')).toBe('+442079460018');
    expect(formatTelephoneNumber(44, '044 20 7946 0018')).toBe('+442079460018');
  });

  it('should keep leading zeroes for countries where they can be significant', () => {
    expect(formatTelephoneNumber(39, '06 6982')).toBe('+39066982');
  });

  it('should return null when it cannot build an E.164 number', () => {
    expect(formatTelephoneNumber(1, 'extension 123')).toBeNull();
    expect(formatTelephoneNumber(1, '12345678901234567890')).toBeNull();
  });
});

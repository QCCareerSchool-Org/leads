const e164Pattern = /^\+[1-9]\d{1,14}$/u;
const extensionPattern = /(?:\s*(?:ext\.?|extension|x)\s*\d+|\s*#\s*\d+)\s*$/iu;
const internationalDialingPrefixPattern = /^(?:00|011)/u;
const countryCodesThatKeepLeadingZero = new Set([ '39', '378', '379' ]);

export const formatTelephoneNumber = (telephoneCountryCode: number, telephoneNumber: string): string | null => {
  const countryCode = String(telephoneCountryCode);
  const numberWithoutExtension = stripExtension(telephoneNumber);
  const digits = numberWithoutExtension.replace(/\D/gu, '');

  if (digits === '') {
    return null;
  }

  const internationalNumber = getInternationalNumber(numberWithoutExtension, digits);
  if (internationalNumber) {
    return internationalNumber;
  }

  const nationalNumber = stripDuplicateCountryCode(countryCode, stripNationalTrunkPrefix(countryCode, stripDuplicateCountryCode(countryCode, digits)));

  return toE164(countryCode + nationalNumber);
};

const stripExtension = (telephoneNumber: string): string => telephoneNumber.trim().replace(extensionPattern, '').trim();

const getInternationalNumber = (telephoneNumber: string, digits: string): string | null => {
  if (telephoneNumber.startsWith('+')) {
    return toE164(digits);
  }

  if (internationalDialingPrefixPattern.test(digits)) {
    return toE164(digits.replace(internationalDialingPrefixPattern, ''));
  }

  return null;
};

const stripDuplicateCountryCode = (countryCode: string, digits: string): string => {
  if (digits.startsWith(countryCode) && toE164(digits)) {
    return digits.slice(countryCode.length);
  }

  return digits;
};

const stripNationalTrunkPrefix = (countryCode: string, digits: string): string => {
  if (digits.startsWith('0') && !countryCodesThatKeepLeadingZero.has(countryCode)) {
    return digits.replace(/^0+/u, '');
  }

  return digits;
};

const toE164 = (digits: string): string | null => {
  const telephoneNumber = `+${digits}`;

  return e164Pattern.test(telephoneNumber) ? telephoneNumber : null;
};

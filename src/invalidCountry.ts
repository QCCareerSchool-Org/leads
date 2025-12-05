const invalidCountries = [ 'RU' ];

export const invalidCountry = (countryCode?: string): boolean => {
  return typeof countryCode !== 'undefined' && invalidCountries.includes(countryCode);
};

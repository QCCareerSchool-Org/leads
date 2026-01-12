export const getName = (submittedFirstName?: string, submittedLastName?: string): [ firstName?: string, lastName?: string ] => {
  // if we already have a last name, or we don't have a first name, then use the first and last names as they are
  if (submittedLastName || !submittedFirstName) {
    return [ submittedFirstName?.trim(), submittedLastName?.trim() ];
  }

  const trimmedFirstName = submittedFirstName.trim();
  const spacePosition = trimmedFirstName.indexOf(' ');
  if (spacePosition === -1) {
    return [ trimmedFirstName, submittedLastName?.trim() ];
  }

  return [ trimmedFirstName.substring(0, spacePosition), trimmedFirstName.substring(spacePosition + 1) ];
};

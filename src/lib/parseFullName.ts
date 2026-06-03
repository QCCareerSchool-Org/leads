export const parseFullName = (fullName: string): { firstName: string; lastName: string | null } => {
  const trimmedFullName = fullName.trim().replace(/\s+/gu, ' ');

  if (!trimmedFullName) {
    return { firstName: '', lastName: null };
  }

  const commaIndex = trimmedFullName.indexOf(',');
  if (commaIndex !== -1) {
    const lastName = trimmedFullName.slice(0, commaIndex).trim();
    const firstName = trimmedFullName.slice(commaIndex + 1).trim();

    return {
      firstName: firstName || lastName,
      lastName: firstName && lastName ? lastName : null,
    };
  }

  const spaceIndex = trimmedFullName.indexOf(' ');
  if (spaceIndex === -1) {
    return { firstName: trimmedFullName, lastName: null };
  }

  return {
    firstName: trimmedFullName.slice(0, spaceIndex),
    lastName: trimmedFullName.slice(spaceIndex + 1),
  };
};

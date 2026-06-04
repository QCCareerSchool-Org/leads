export const torontoDateTime = (date: Date): string => {
  return date.toLocaleString('sv-SE', {
    timeZone: 'America/Toronto',
    hour12: false,
  });
};

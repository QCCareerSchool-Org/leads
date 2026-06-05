export const firstCommaSeparatedValue = (value: string | undefined): string | null => {
  const first = value?.split(',')[0]?.trim();
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  return first || null;
};

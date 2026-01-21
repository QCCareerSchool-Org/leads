export const isError = (o: unknown): o is Error => {
  return typeof o === 'object' && o !== null && 'message' in o && typeof o.message === 'string';
};

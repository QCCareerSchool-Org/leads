import { isError } from './isError.mjs';

export const coerceError = (err: unknown, defaultMessage = 'Unknown error'): Error => {
  if (isError(err)) {
    return err;
  }

  if (typeof err === 'string') {
    return Error(err);
  }

  try {
    return Error(JSON.stringify(err));
  } catch {
    return Error(defaultMessage);
  }
};

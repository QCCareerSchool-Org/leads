import type { IErrorResult } from 'generic-result-type';

import { isError } from './isError.mjs';

export const errToResult = (err: unknown, defaultMessage = 'Unknown error'): IErrorResult => {
  if (isError(err)) {
    return fail(err);
  }

  if (typeof err === 'string') {
    return fail(Error(err));
  }

  try {
    return fail(Error(JSON.stringify(err)));
  } catch {
    return fail(Error(defaultMessage));
  }
};

import type { ErrorRequestHandler } from 'express';

import { coerceError } from '#src/lib/coerceError.mjs';
import { logError } from '#src/logger.mjs';

const INTERNAL_SERVER_ERROR_CODE = 500;

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const error = coerceError(err);

  logError('Unhandled error', error.message);

  if (!res.headersSent) {
    res.status(INTERNAL_SERVER_ERROR_CODE).send(error.message);
  } else {
    next(err);
  }
};

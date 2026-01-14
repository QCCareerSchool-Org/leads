import type { ErrorRequestHandler } from 'express';

import { isError } from '#src/lib/isError.mjs';
import { logError } from '#src/logger.mjs';

const INTERNAL_SERVER_ERROR_CODE = 500;

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logError('Unhandled error', err);
  if (!res.headersSent) {
    res.status(INTERNAL_SERVER_ERROR_CODE).send(isError(err) ? err.message : undefined);
  } else {
    next(err);
  }
};

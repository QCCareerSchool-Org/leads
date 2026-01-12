import type { ErrorRequestHandler } from 'express';

import { logError } from '../logger.mjs';

const INTERNAL_SERVER_ERROR_CODE = 500;

export const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logError('Unhandled error', err);
  if (!res.headersSent) {
    res.status(INTERNAL_SERVER_ERROR_CODE).send(isError(err) ? err.message : undefined);
  } else {
    next(err);
  }
};

const isError = (o: unknown): o is Error => {
  return typeof o === 'object' && o !== null && 'message' in o && typeof o.message === 'string';
};

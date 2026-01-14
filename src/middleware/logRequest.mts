import type { RequestHandler } from 'express';

import { logInfo } from '#src/logger.mjs';

export const logRequest: RequestHandler = (req, res, next) => {
  logInfo('Incomming request', { body: req.body as unknown, rawBody: req.rawBody });
  next();
};

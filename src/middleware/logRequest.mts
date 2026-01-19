import type { RequestHandler } from 'express';

import { logInfo } from '#src/logger.mjs';

export const logRequest: RequestHandler = (req, res, next) => {
  logInfo('Incomming request', { params: req.params, query: req.query, body: req.body as unknown });
  next();
};

import type { RequestHandler } from 'express';

import { fbPage } from '#src/interactors/facebook/page/index.mjs';
import { logDebug, logError } from '#src/logger.mjs';
import { logWarning } from '#src/logger.mjs';
import { validateRequest } from './validateRequest.mjs';

export const handlePage: RequestHandler = async (req, res) => {
  const payload = await validateRequest(req.body);
  if (!payload.success) {
    logWarning(payload.error.message);
    res.status(400).send(payload.error.message);
    return;
  }

  logDebug('Handling facebook page', payload.value);

  const result = await fbPage(payload.value);
  if (!result.success) {
    logError(result.error.message);
  }

  res.status(200).end(); // we'll return 200 to Facebook either way
};

import type { RequestHandler } from 'express';

import { logWarning } from '#src/logger.mjs';
import { logError } from '#src/logger.mjs';
import { verifySignature } from '../lib/verifySignature.mjs';

export const verifyFBSignature: RequestHandler = (req, res, next) => {
  if (process.env.MODE === 'development') {
    next();
    return;
  }

  if (req.method === 'GET') {
    next();
    return;
  }

  const header = req.headers['x-hub-signature-256'];

  if (!header) {
    logWarning('X-Hub-Signature-256 header not found');
    res.status(400).send('X-Hub-Signature-256 header not found');
    return;
  }

  if (Array.isArray(header)) {
    logWarning('X-Hub-Signature-256 header is not a string');
    res.status(400).send('X-Hub-Signature-256 header is not a string');
    return;
  }

  const matches = /^sha256=([0-9a-f])+$/u.exec(header);

  if (matches === null || matches.length === 0) {
    logWarning('X-Hub-Signature-256 header has an invalid format');
    res.status(400).send('X-Hub-Signature-256 header has an invalid format');
    return;
  }

  const signature = matches[1];

  if (!req.rawBody) {
    logError('Raw buffer not detected');
    res.status(500).send('Raw buffer not detected');
    return;
  }

  const result = verifySignature(req.rawBody, signature);

  if (!result.success) {
    logWarning(result.error.message);
    res.status(403).send(result.error.message);
    return;
  }

  next();
};

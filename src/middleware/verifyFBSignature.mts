import type { RequestHandler } from 'express';

import { verifySignature } from '../lib/verifySignature.mjs';

export const verifyFBSignature: RequestHandler = (req, res, next) => {
  if (process.env.MODE === 'development') {
    next();
    return;
  }

  const header = req.headers['x-hub-signature-256'];

  if (!header) {
    res.status(400).send('X-Hub-Signature-256 header not found');
    return;
  }

  if (Array.isArray(header)) {
    res.status(400).send('X-Hub-Signature-256 header is not a string');
    return;
  }

  const matches = /^sha256=([0-9a-f])+$/u.exec(header);

  if (matches === null || matches.length === 0) {
    res.status(400).send('X-Hub-Signature-256 header has an invalid format');
    return;
  }

  const signature = matches[0];

  if (!req.rawBody) {
    res.status(500).send('Raw buffer not detected');
    return;
  }

  const result = verifySignature(req.rawBody, signature);

  if (!result.success) {
    res.status(403).send(result.error.message);
    return;
  }

  next();
};

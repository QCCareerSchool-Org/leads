import type { RequestHandler } from 'express';

import { fbPayload } from '#src/interactors/facebook/payload.mjs';
import { validateRequest } from './validateRequest.mjs';

export const handlePayload: RequestHandler = async (req, res) => {
  const payload = await validateRequest(req.body);
  if (!payload.success) {
    res.status(400).send(payload.error.message);
    return;
  }
  const body = payload.value;

  const result = await fbPayload(body);

  if (!result.success) {
    res.status(500).send(result.error.message);
    return;
  }

  res.status(200).end();
};

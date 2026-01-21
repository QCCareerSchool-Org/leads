import type { RequestHandler } from 'express';

import { fbVerify } from '#src/interactors/facebook/verify.mjs';
import { validateRequest } from './validateRequest.mjs';

export const handleVerification: RequestHandler = async (req, res) => {
  const validateResult = await validateRequest(req.query);
  if (!validateResult.success) {
    res.status(400).send(validateResult.error.message);
    return;
  }
  const payload = validateResult.value;

  const result = fbVerify(payload);
  if (!result.success) {
    res.status(403).send(result.error.message);
    return;
  }

  res.status(200).type('text/plain').send(result.value);
};

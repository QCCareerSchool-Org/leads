import type { RequestHandler } from 'express';

import { validateRequest } from './validateRequest.mjs';
import { verify } from '../../interactors/facebook.mjs';

export const handleFacebookVerification: RequestHandler = async (req, res) => {
  const validateResult = await validateRequest(req.body);
  if (!validateResult.success) {
    res.status(400).send(validateResult.error.message);
    return;
  }
  const payload = validateResult.value;

  const result = verify(payload);
  if (!result.success) {
    res.status(403).send(result.error.message);
    return;
  }

  res.status(200).type('text/plain').send(result.value);
};

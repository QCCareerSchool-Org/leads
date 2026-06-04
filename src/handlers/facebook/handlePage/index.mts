import type { RequestHandler } from 'express';

import { fbPage } from '#src/interactors/facebook/page/index.mjs';
import { validateRequest } from './validateRequest.mjs';

export const handlePage: RequestHandler = async (req, res) => {
  const payload = await validateRequest(req.body);
  if (!payload.success) {
    console.log(payload.error.message);
    res.status(400).send(payload.error.message);
    return;
  }

  const result = await fbPage(payload.value);
  if (!result.success) {
    console.error(result.error.message);
  }

  res.status(200).end(); // we'll return 200 to Facebook either way
};

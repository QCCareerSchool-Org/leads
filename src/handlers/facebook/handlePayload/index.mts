import type { Request, Response } from 'express';

import { isSchoolSlug } from '#src/domain/school.mjs';
import { fbPayload } from '#src/interactors/facebook/payload.mjs';
import { validateRequest } from './validateRequest.js';

interface Params {
  schoolSlug: string;
}

export const handlePayload = async (req: Request<Params>, res: Response) => {
  const schoolSlug = req.params.schoolSlug;
  if (!isSchoolSlug(schoolSlug)) {
    res.status(404).send('Invalid school');
    return;
  }

  const payload = await validateRequest(req.body);
  if (!payload.success) {
    res.status(400).send(payload.error.message);
    return;
  }
  const body = payload.value;

  const result = await fbPayload(body, schoolSlug);

  if (!result.success) {
    res.status(500).send(result.error.message);
    return;
  }

  res.status(200).end();
};

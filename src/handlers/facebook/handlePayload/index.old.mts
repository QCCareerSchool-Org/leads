import type { RequestHandler } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';

import { isSchoolSlug } from '#src/domain/school.mjs';
import { fbPayload } from '#src/interactors/facebook/payload.mjs';
import { validateRequest } from './validateRequest.mjs';

interface Params extends ParamsDictionary {
  schoolSlug: string;
}

export const handlePayload: RequestHandler<Params> = async (req, res) => {
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

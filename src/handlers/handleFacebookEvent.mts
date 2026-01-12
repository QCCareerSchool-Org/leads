import type { Request, Response } from 'express';
import type { ResultType } from 'generic-result-type';
import { Result } from 'generic-result-type';
import z from 'zod';

import { type FBPayload } from '../domain/facebook.mjs';
import { isSchoolSlug } from '../domain/school.mjs';
import { storeLeadGenChanges } from '../interactors/facebook.mjs';

interface Params {
  schoolSlug: string;
}

export const handleFacebookEvent = async (req: Request<Params>, res: Response) => {
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

  const result = await storeLeadGenChanges(body, schoolSlug);

  if (!result.success) {
    res.status(500).send(result.error.message);
    return;
  }

  res.status(200).end();
};

const schema = z.object({
  entry: z.array(
    z.object({
      id: z.string(),
      uid: z.string().optional(),
      time: z.coerce.number(),
      changes: z.array(
        z.object({
          field: z.string(),
          value: z.object().loose(),
        }).loose(),
      ),
    }).loose(),
  ),
  object: z.string(),
});

const validateRequest = async (requestBody: unknown): Promise<ResultType<FBPayload>> => {
  const result = await schema.safeParseAsync(await requestBody);
  if (result.error) {
    return Result.fail(Error(result.error.message));
  }
  return Result.success(result.data);
};

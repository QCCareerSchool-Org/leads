import type { Request, Response } from 'express';
import z from 'zod';

import { isSchoolSlug } from '../domain/school.js';
import { facebookAddPush, facebookFetchData } from '../interactors/facebookPush.js';
import type { ResultType } from '../lib/result.js';
import { Result } from '../lib/result.js';

export interface FBChange {
  field: string;
  value: {
    verb: string;
    /** numerical string */
    object_id: string;
  };
}

export interface FBEntry {
  time: number;
  changes: FBChange[];
  /** numerical string */
  id: string;
  /** numerical string */
  uid: string;
};

export interface FBRequest {
  entry: FBEntry[];
  object: string;
}

export const handleFacebookPush = async (req: Request<{ schoolSlug: string }>, res: Response) => {
  const schoolSlug = req.params.schoolSlug;
  if (!isSchoolSlug(schoolSlug)) {
    res.status(400).send('Invalid school');
    return;
  }

  const validateResult = await validateRequest(req.body);
  if (!validateResult.success) {
    res.status(400).send(validateResult.error.message);
    return;
  }
  const body = validateResult.value;

  for (const entry of body.entry) {

    for (const change of entry.changes) {

      if (change.field !== '') {
        continue;
      }

      const fetchResult = await facebookFetchData(change);
      if (!fetchResult.success) {
        res.status(500).send(fetchResult.error.message);
        return;
      }

      const addResult = await facebookAddPush(change);
      if (!addResult.success) {
        switch (addResult.error.constructor) {
          default:
            res.status(500).send(addResult.error.message);
        }
        return;
      }
    }
  }

  res.status(200).end();
};

const schema = z.object({
  entry: z.array(z.object({
    time: z.number(),
    changes: z.array(z.object({
      field: z.string(),
      value: z.object({
        verb: z.string(),
        object_id: z.string(), // eslint-disable-line camelcase
      }),
    })),
    id: z.string(),
    uid: z.string(),
  })),
  object: z.string(),
});

const validateRequest = async (requestBody: Request['body']): Promise<ResultType<FBRequest>> => {
  const result = await schema.safeParseAsync(await requestBody);
  if (result.error) {
    return Result.fail(Error(result.error.message));
  }
  return Result.success(result.data);
};

import { type Result, success } from 'generic-result-type';
import z from 'zod';

import type { FBObject } from '#src/domain/facebook/object.mjs';

export const validateRequest = async (requestBody: unknown): Promise<Result<FBObject>> => {
  const result = await schema.safeParseAsync(await requestBody);
  if (result.error) {
    return fail(Error(result.error.message));
  }
  return success(result.data);
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

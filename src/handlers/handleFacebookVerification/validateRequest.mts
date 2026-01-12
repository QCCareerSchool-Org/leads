import type { ResultType } from 'generic-result-type';
import { Result } from 'generic-result-type';
import z from 'zod';

import type { FBVerification, FBVerifyMode } from '../../domain/facebook.mjs';

const schema = z.object({
  'hub.mode': z.literal<FBVerifyMode>('subscribe'),
  'hub.challenge': z.coerce.number(),
  'hub.verify_token': z.string(),
});

export const validateRequest = async (requestBody: unknown): Promise<ResultType<FBVerification>> => {
  const result = await schema.safeParseAsync(requestBody);
  if (result.error) {
    return Result.fail(Error(result.error.message));
  }
  return Result.success(result.data);
};

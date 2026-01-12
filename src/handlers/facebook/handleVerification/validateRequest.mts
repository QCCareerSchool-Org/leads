import type { Result } from 'generic-result-type';
import { fail, success } from 'generic-result-type';
import z from 'zod';

import type { FBVerification, FBVerifyMode } from '#src/domain/facebook/verification.mjs';

const schema = z.object({
  'hub.mode': z.literal<FBVerifyMode>('subscribe'),
  'hub.challenge': z.coerce.number(),
  'hub.verify_token': z.string(),
});

export const validateRequest = async (requestBody: unknown): Promise<Result<FBVerification>> => {
  const result = await schema.safeParseAsync(requestBody);
  if (result.error) {
    return fail(Error(result.error.message));
  }
  return success(result.data);
};

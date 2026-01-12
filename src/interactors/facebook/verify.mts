import type { Result } from 'generic-result-type';
import { fail, success } from 'generic-result-type';

import type { FBVerification } from '#src/domain/facebook/verification.mjs';

const verifyToken = process.env.FB_VERIFY_TOKEN;
if (!verifyToken) {
  throw Error('Environment variable FB_VERIFY_TOKEN not found');
}

export const fbVerify = (payload: FBVerification): Result<number> => {
  if (payload['hub.verify_token'] !== verifyToken) {
    return fail(Error('hub.verify_token mismatch'));
  }
  return success(payload['hub.challenge']);
};

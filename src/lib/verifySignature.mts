import type { Result } from 'generic-result-type';
import { fail, success } from 'generic-result-type';

import { createSHA256Hash } from './createSHA256Hash.mjs';

export const verifySignature = (payload: Buffer, signature: string): Result => {
  const hash = createSHA256Hash(payload);

  if (hash !== signature) {
    return fail(Error('Signature mismatch'));
  }

  return success(undefined);
};

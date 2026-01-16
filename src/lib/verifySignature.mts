import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import { compareHex } from './compareHex.mjs';
import { createSHA256Hash } from './createSHA256Hash.mjs';

export const verifySignature = (payload: Buffer, signature: string): Result => {
  const hash = createSHA256Hash(payload);

  if (!compareHex(hash, signature)) {
    return failure(Error('Signature mismatch'));
  }

  return success();
};

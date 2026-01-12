import type { ResultType } from 'generic-result-type';
import { Result } from 'generic-result-type';

import { createSHA256Hash } from './createSHA256Hash.mjs';

export const verifySignature = (payload: Buffer, signature: string): ResultType<void> => {
  const hash = createSHA256Hash(payload);

  if (hash !== signature) {
    return Result.fail(Error('Signature mismatch'));
  }

  return Result.success(undefined);
};

import { timingSafeEqual } from 'node:crypto';

import { logError } from '#src/logger.mjs';

export const compareHex = (aHex: string, bHex: string): boolean => {
  const aBuf = Buffer.from(aHex, 'hex');
  const bBuf = Buffer.from(bHex, 'hex');
  try {
    return timingSafeEqual(aBuf, bBuf);
  } catch (err: unknown) {
    logError('Unable to compare signatures', err);
    return false;
  }
};

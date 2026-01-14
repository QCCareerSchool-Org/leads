import { timingSafeEqual } from 'node:crypto';

export const compareHex = (aHex: string, bHex: string): boolean => {
  const aBuf = Buffer.from(aHex, 'hex');
  const bBuf = Buffer.from(bHex, 'hex');
  return timingSafeEqual(aBuf, bBuf);
};

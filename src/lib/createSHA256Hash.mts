import type { BinaryLike } from 'crypto';
import crypto from 'crypto';

const key = process.env.FB_APP_SECRET;
if (!key) {
  throw Error('Environment variable FB_APP_SECRET not found');
}

export const createSHA256Hash = (input: BinaryLike) => {
  return crypto.createHmac('sha256', key).update(input).digest('hex');
};

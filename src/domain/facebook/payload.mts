import type { FBEntry } from './entry.mjs';
import { isFBEntry } from './entry.mjs';

export interface FBPayload {
  object: string;
  entry: FBEntry[];
}

export const isFBPayload = (obj: unknown): obj is FBPayload => {
  return obj !== null && typeof obj === 'object' &&
    'object' in obj && typeof obj.object === 'string' &&
    'entry' in obj && Array.isArray(obj.entry) && obj.entry.every(isFBEntry);
};

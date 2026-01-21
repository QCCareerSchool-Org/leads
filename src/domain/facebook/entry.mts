import { logDebug } from '#src/logger.mjs';
import type { FBChange } from './change.mjs';
import { isFBChange } from './change.mjs';

export interface FBEntry {
  id: string;
  time: number;
  changes: FBChange[];
}

export const isFBEntry = (obj: unknown): obj is FBEntry => {
  const result = obj !== null && typeof obj === 'object' &&
    'id' in obj && typeof obj.id === 'string' &&
    'time' in obj && typeof obj.time === 'number' &&
    'changes' in obj && Array.isArray(obj.changes) && obj.changes.every(isFBChange);
  if (!result) {
    logDebug('Not an FBEntry', obj);
  }
  return result;
};

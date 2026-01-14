import type { FBChange } from './change/index.mjs';
import { isFBChange } from './change/index.mjs';

export interface FBEntry {
  id: string;
  time: number;
  changes: FBChange[];
}

export const isFBEntry = (obj: unknown): obj is FBEntry => {
  return obj !== null && typeof obj === 'object' &&
  'id' in obj && typeof obj.id === 'string' &&
  'time' in obj && typeof obj.id === 'number' &&
  'changes' in obj && Array.isArray(obj.changes) && obj.changes.every(isFBChange);
};

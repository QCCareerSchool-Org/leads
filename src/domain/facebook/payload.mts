import type { FBEntry } from './entry.mjs';
import { isFBEntry } from './entry.mjs';

export interface FBObject {
  object: string;
  entry: FBEntry[];
}

export interface FBPage extends FBObject {
  object: 'page';
};

export const isFBObject = (obj: unknown): obj is FBObject => {
  return obj !== null && typeof obj === 'object' &&
    'object' in obj && typeof obj.object === 'string' &&
    'entry' in obj && Array.isArray(obj.entry) && obj.entry.every(isFBEntry);
};

export const isFBPage = (obj: unknown): obj is FBPage => {
  return isFBObject(obj) && obj.object === 'page';
};

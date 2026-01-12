import type { FBChange } from './change.mjs';

export interface FBEntry {
  id: string;
  time: number;
  changes: FBChange[];
}

/* eslint-disable camelcase */
import { logDebug } from '#src/logger.mjs';
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
  const result = obj !== null && typeof obj === 'object' &&
    'object' in obj && typeof obj.object === 'string' &&
    'entry' in obj && Array.isArray(obj.entry) && obj.entry.every(isFBEntry);
  if (!result) {
    logDebug('Not an FBObject', obj);
  }
  return result;
};

export const isFBPage = (obj: unknown): obj is FBPage => {
  const result = isFBObject(obj) && obj.object === 'page';
  if (!result) {
    logDebug('Not an FBPage', obj);
  }
  return result;
};

const test = {
  entry: [
    {
      changes: [
        {
          field: 'leadgen',
          value: {
            created_time: 1768430020,
            form_id: '1510363700231237',
            leadgen_id: '1570418743993590',
            page_id: '313411673642',
          },
        },
      ],
      id: '313411673642',
      time: 1768430023,
    },
  ],
  object: 'page',
};

if (!isFBPage(test)) {
  throw Error();
}

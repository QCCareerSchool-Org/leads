import type { ISuccessResult, Result } from 'generic-result-type';
import { fail, success } from 'generic-result-type';

import type { FBObject } from '#src/domain/facebook/object.mjs';
import { isFBPage } from '#src/domain/facebook/object.mjs';
import type { FBEntry } from '#src/domain/facebook.mjs';
import { logError } from '#src/logger.mjs';
import { logDebug } from '#src/logger.mjs';
import { fbChange } from './change.mjs';

/**
 * Acts only on "page" payloads
 * @param page the payload
 * @returns the number of changes acted on
 */
export const fbPage = async (page: FBObject): Promise<Result<number>> => {
  logDebug('Processing page');

  if (!isFBPage(page)) {
    return fail(Error('Not a page object'));
  }

  let total = 0;

  for (const entry of page.entry) {
    const result = await fbEntry(entry);
    total += result.value;
  }

  return success(total);
};

/**
 * Acts on any entry from a "page" payload
 * @param entry the entry
 * @returns the number of changes acted on
 */
const fbEntry = async (entry: FBEntry): Promise<ISuccessResult<number>> => {
  logDebug('Processing entry');

  const pageId = entry.id;
  let total = 0;

  for (const change of entry.changes) {
    const result = await fbChange(change, pageId);
    if (result.success) {
      total++;
    } else {
      logError(result.error.message);
    }
  }

  return success(total);
};

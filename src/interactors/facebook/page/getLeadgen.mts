import type { Result } from 'generic-result-type';
import { fail, success } from 'generic-result-type';

import type { Leadgen } from '#src/domain/facebook/leadgen.mjs';
import { isLeadGen } from '#src/domain/facebook/leadgen.mjs';
import { coerceError } from '#src/lib/coerceError.mjs';
import { logDebug } from '#src/logger.mjs';

export const getLeadgen = async (id: string, pageAccessToken: string): Promise<Result<Leadgen>> => {
  // eslint-disable-next-line camelcase
  const params = new URLSearchParams({ access_token: pageAccessToken });
  const url = `https://graph.facebook.com/v24.0/${id}?${params.toString()}`;
  logDebug('Fetching', url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return fail(Error(response.statusText));
    }
    const body = await response.json();
    if (!isLeadGen(body)) {
      return fail(Error('Unexpected response'));
    }
    return success(body);
  } catch (err: unknown) {
    return fail(coerceError(err, 'Unknown error fetching leadgen'));
  }
};

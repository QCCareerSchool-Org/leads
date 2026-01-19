import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import type { Leadgen } from '#src/domain/facebook/leadgen.mjs';
import { isLeadgen } from '#src/domain/facebook/leadgen.mjs';
import { coerceError } from '#src/lib/coerceError.mjs';
import { logDebug } from '#src/logger.mjs';

export const getLeadgen = async (id: string, pageAccessToken: string): Promise<Result<Leadgen>> => {
  // eslint-disable-next-line camelcase
  const params = new URLSearchParams({ fields: 'created_time,field_data,custom_disclaimer_responses', access_token: pageAccessToken });
  const url = `https://graph.facebook.com/v24.0/${id}?${params.toString()}`;
  logDebug('Fetching', url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return failure(Error(response.statusText));
    }
    const body = await response.json();
    if (!isLeadgen(body)) {
      return failure(Error('Unexpected response'));
    }
    logDebug('Leadgen', body);
    return success(body);
  } catch (err: unknown) {
    return failure(coerceError(err, 'Unknown error fetching leadgen'));
  }
};

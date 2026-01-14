import type { Result } from 'generic-result-type';
import { success } from 'generic-result-type';

import type { Leadgen } from '#src/domain/facebook/leadgen.mjs';
import { isLeadGen } from '#src/domain/facebook/leadgen.mjs';

export const getLeadgen = async (id: string, pageAccessToken: string): Promise<Result<Leadgen>> => {
  // eslint-disable-next-line camelcase
  const params = new URLSearchParams({ access_token: pageAccessToken });
  const response = await fetch(`https://graph.facebook.com/v24.0/${id}?${params.toString()}`);
  if (!response.ok) {
    return fail(Error(response.statusText));
  }
  const body = await response.json();
  if (!isLeadGen(body)) {
    return fail(Error('Unexpected response'));
  }
  return success(body);
};

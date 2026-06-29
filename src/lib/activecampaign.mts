import { failure, type Result } from 'generic-result-type';

import { type ACCreateContactResult, isACCreateContactResult } from '#src/domain/activecampaign.mjs';
import { fetchWithRetry } from './fetchWithRetry.mjs';

const activeCampaignAccount = process.env.ACTIVE_CAMPAIGN_ACCOUNT;
if (activeCampaignAccount === undefined) {
  throw Error('Environment variable ACTIVE_CAMPAIGN_ACCOUNT is undefined');
}

const baseUrl = `https://${activeCampaignAccount}.api-us1.com/api/3/`;

export const createActiveCampaignContact = async (signal?: AbortSignal): Promise<Result<ACCreateContactResult>> => {
  const url = `${baseUrl}foo`;

  const body = {};

  try {
    const response = await fetchWithRetry(url, {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
      signal,
    });

    if (!response.ok) {
      return failure(Error(response.statusText));
    }

    const responseBody = await response.json();

    if (!isACCreateContactResult(responseBody)) {
      return failure(Error('Unexpected response'));
    }

  } catch (err) {
    if (!signal?.aborted) {
      console.error(err);
    }
    return failure(err instanceof Error ? err : Error(String(err)));
  }

  return failure(Error('Not implemented'));
};

export const sendActiveCampaignEmail = async (): Promise<Result> => {
  await new Promise(res => setTimeout(res, 2000));
  return failure(Error('Not implemented'));
};

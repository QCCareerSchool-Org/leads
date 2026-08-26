import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import type { JsonValue } from '#src/domain/json.mjs';
import { createContact } from '#src/lib/activecampaign.mjs';
import type { LeadPayload } from '#src/lib/storeLead.mjs';
import { storeLead } from '#src/lib/storeLead.mjs';
import type { Page } from './pageMap.mjs';

export const store = async (page: Page, automationIds: bigint[], emailAddresses: string[], fields: JsonValue, emailOptIn: boolean, smsOptIn: boolean, firstName?: string, telephoneNumber?: string): Promise<Result> => {
  const errors: Error[] = [];

  const emailAddress = emailAddresses[0];
  if (typeof emailAddress === 'undefined') {
    throw Error('No email addresses');
  }

  const leadPayload: LeadPayload = {
    ipAddress: '127.0.0.1',
    school: page.schoolName,
    emailAddress,
    firstName: firstName ?? null,
    lastName: null,
    telephoneNumber: telephoneNumber ?? null,
    emailOptIn,
    smsOptIn,
    countryCode: null,
    provinceCode: null,
    city: null,
    referrer: null,
    gclid: null,
    msclkid: null,
    browserName: null,
    browserVersion: null,
    os: null,
    mobile: null,
    fbFields: fields,
  };
  const storeResult = await storeLead(leadPayload);
  if (!storeResult.success) {
    errors.push(storeResult.error);
  }

  for (const e of emailAddresses) {
    await createContact(e, true, false, page.schoolName, firstName, undefined, 'US', null, null, telephoneNumber ?? undefined, automationIds, undefined, 'Meta');
  }

  if (errors.length > 0) {
    return failure(Error(errors.map(e => e.message).join('\n')));
  }

  return success();
};

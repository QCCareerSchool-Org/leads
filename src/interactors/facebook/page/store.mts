import type { Result } from 'generic-result-type';

import type { JsonValue } from '#src/domain/json.mjs';
import type { LeadPayload } from '#src/lib/storeLead.mjs';
import { storeLead } from '#src/lib/storeLead.mjs';
import type { Page } from './pageMap.mjs';

export const store = async (page: Page, emailAddress: string, fields: JsonValue, emailOptIn: boolean, smsOptIn: boolean, firstName?: string, telephoneNumber?: string): Promise<Result<string>> => {
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

  return storeLead(leadPayload);
};

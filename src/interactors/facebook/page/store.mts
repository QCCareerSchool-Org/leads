import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import type { JsonValue } from '#src/domain/json.mjs';
import type { LeadPayload } from '#src/lib/storeLead.mjs';
import { storeLead } from '#src/lib/storeLead.mjs';
import { addToBrevo } from './addToBrevo.mjs';
import type { Form, Page } from './pageMap.mjs';

export const store = async (page: Page, form: Form, emailAddresses: string[], fields: JsonValue, emailOptIn: boolean, smsOptIn: boolean, firstName?: string, telephoneNumber?: string): Promise<Result> => {
  const errors: Error[] = [];

  const leadPayload: LeadPayload = {
    ipAddress: '127.0.0.1',
    school: page.schoolName,
    emailAddress: emailAddresses[0],
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

  const listIds: number[] = [];
  if (emailOptIn) {
    listIds.push(...form.listIds);
  }
  if (smsOptIn) {
    listIds.push(...form.smsListIds);
  }

  for (const emailAddress of emailAddresses) {
    const brevoResult = await addToBrevo(emailAddress, firstName, telephoneNumber, listIds, form.emailTemplateId);
    if (!brevoResult.success) {
      errors.push(brevoResult.error);
    }
  }

  if (errors.length > 0) {
    return failure(Error(errors.map(e => e.message).join('\n')));
  }

  return success();
};

import type { Result } from 'generic-result-type';
import { fail, success } from 'generic-result-type';

import type { FBChange, FBLeadgenChange } from '#src/domain/facebook/change.mjs';
import { isFBLeadgenChange } from '#src/domain/facebook/change.mjs';
import type { JsonValue } from '#src/domain/json.mjs';
import { type LeadPayload, storeLead } from '#src/lib/storeLead.mjs';
import { logDebug } from '#src/logger.mjs';
import { addToBrevo } from './addToBrevo.mjs';
import { getLeadgen } from './getLeadgen.mjs';
import type { Form, Page } from './pageMap.mjs';
import { pageMap } from './pageMap.mjs';

export const fbChange = async (change: FBChange): Promise<Result> => {
  if (isFBLeadgenChange(change)) {
    return fbLeadgenChange(change);
  }

  return fail(Error('Unrecognized change'));
};

/**
 * Acts on a change
 * @param change the change
 * @returns a Result type
 */
const fbLeadgenChange = async (change: FBLeadgenChange): Promise<Result> => {
  logDebug('Processing change');

  const page = pageMap[change.value.page_id];
  if (!page) {
    return fail(Error(`page id ${change.value.page_id} not found`));
  }

  const form = page.formMap[change.value.form_id];
  if (!form) {
    return fail(Error(`form "${change.value.form_id}" not found in form map`));
  }

  const data = await getLeadgen(change.value.leadgen_id, page.accessToken);
  if (!data.success) {
    return data;
  }

  const emailAddresses = data.value.field_data.find(f => f.name === 'email')?.values;
  if (!emailAddresses || emailAddresses.length === 0) {
    return fail(Error(`No email addresses found in change ${change.value.leadgen_id}`));
  }

  const firstName = data.value.field_data.find(f => f.name === 'first name')?.values[0];

  const telephoneNumber = data.value.field_data.find(f => f.name === 'phone')?.values[0];

  return store(page, form, emailAddresses, data.value.field_data, firstName, telephoneNumber);
};

const store = async (page: Page, form: Form, emailAddresses: string[], fields: JsonValue, firstName?: string, telephoneNumber?: string): Promise<Result> => {
  const errors: Error[] = [];

  const leadPayload: LeadPayload = {
    ipAddress: '127.0.0.1',
    school: page.schoolName,
    emailAddress: emailAddresses[0],
    firstName: firstName ?? null,
    lastName: null,
    telephoneNumber: telephoneNumber ?? null,
    emailOptIn: true,
    smsOptIn: true,
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

  for (const emailAddress of emailAddresses) {
    const brevoResult = await addToBrevo(emailAddress, firstName, telephoneNumber, form.listIds, form.emailTemplateId);
    if (!brevoResult.success) {
      errors.push(brevoResult.error);
    }
  }

  if (errors.length > 0) {
    return fail(Error(errors.map(e => e.message).join('\n')));
  }

  return success();
};

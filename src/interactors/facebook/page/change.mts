import type { Result } from 'generic-result-type';
import { failure } from 'generic-result-type';

import type { FBChange, FBLeadgenChange } from '#src/domain/facebook/change.mjs';
import { isFBLeadgenChange } from '#src/domain/facebook/change.mjs';
import { logDebug } from '#src/logger.mjs';
import { getLeadgen } from './getLeadgen.mjs';
import { pageMap } from './pageMap.mjs';
import { store } from './store.mjs';

export const fbChange = async (change: FBChange): Promise<Result> => {
  if (isFBLeadgenChange(change)) {
    return fbLeadgenChange(change);
  }

  return failure(Error('Unrecognized change'));
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
    return failure(Error(`page id ${change.value.page_id} not found`));
  }

  const form = page.formMap[change.value.form_id];
  if (!form) {
    return failure(Error(`form "${change.value.form_id}" not found in form map`));
  }

  const data = await getLeadgen(change.value.leadgen_id, page.accessToken);
  if (!data.success) {
    return data;
  }

  const getValues = (fieldNames: string[]): string[] | undefined => {
    return data.value.field_data.find(f => fieldNames.includes(f.name))?.values;
  };

  const emailAddresses = getValues([ 'email', 'email_address', 'email address' ]);
  if (!emailAddresses || emailAddresses.length === 0) {
    return failure(Error(`No email addresses found in change ${change.value.leadgen_id}`));
  }

  const firstName = getValues([ 'first name', 'first_name' ])?.[0];

  const telephoneNumber = getValues([ 'phone', 'phone number', 'phone_number', 'tel', 'telephone number', 'telephone_number' ])?.[0];

  const emailOptIn = data.value.custom_disclaimer_responses.findIndex(r => r.checkbox_key.includes('additional_emails') && r.is_checked === '1') !== -1;
  const smsOptIn = data.value.custom_disclaimer_responses.findIndex(r => r.checkbox_key.includes('sms_offers') && r.is_checked === '1') !== -1;

  return store(page, form, emailAddresses, data.value.field_data, emailOptIn, smsOptIn, firstName, telephoneNumber);
};

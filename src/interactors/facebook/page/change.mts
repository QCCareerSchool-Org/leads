import type { Result } from 'generic-result-type';
import { fail, success } from 'generic-result-type';

import type { FBChange, FBLeadgenChange } from '#src/domain/facebook/change.mjs';
import { isFBLeadgenChange } from '#src/domain/facebook/change.mjs';
import { logDebug } from '#src/logger.mjs';
import { addToBrevo } from './addToBrevo.mjs';
import { getLeadgen } from './getLeadgen.mjs';
import { pageMap } from './pageMap.mjs';

export const fbChange = async (change: FBChange, pageId: string): Promise<Result> => {
  if (isFBLeadgenChange(change)) {
    return fbLeadgenChange(change, pageId);
  }

  return fail(Error('Unrecognized change'));
};

/**
 * Acts on a change
 * @param change the change
 * @returns a Result type
 */
const fbLeadgenChange = async (change: FBLeadgenChange, pageId: string): Promise<Result> => {
  logDebug('Processing change');

  const page = pageMap[pageId];
  if (!page) {
    return fail(Error(`page id ${pageId} not found`));
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

  const firstNames = data.value.field_data.find(f => f.name === 'first_name')?.values;

  const phoneNumbers = data.value.field_data.find(f => f.name === 'phone_number')?.values;

  const errors: Error[] = [];
  for (const emailAddress of emailAddresses) {
    const result = await addToBrevo(emailAddress, firstNames?.[0], phoneNumbers?.[0], form.listIds, form.emailTemplateId);
    if (!result.success) {
      errors.push(result.error);
    }
  }

  if (errors.length > 0) {
    return fail(Error(errors.map(e => e.message).join('\n')));
  }

  return success();
};

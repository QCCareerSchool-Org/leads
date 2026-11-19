import type { Result } from 'generic-result-type';
import { failure } from 'generic-result-type';

import type { FBChange, FBLeadgenChange } from '#src/domain/facebook/change.mjs';
import { isFBLeadgenChange } from '#src/domain/facebook/change.mjs';
import { isLeadgenFieldDataValues } from '#src/domain/facebook/leadgen.mjs';
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
  const page = pageMap[change.value.page_id];
  if (!page) {
    return failure(Error(`page id ${change.value.page_id} not found`));
  }

  const formId = change.value.form_id;

  const form = page.formMap[formId];
  if (!form) {
    return failure(Error(`form "${formId}" not found in form map`));
  }

  const data = await getLeadgen(change.value.leadgen_id, page.accessToken);
  if (!data.success) {
    return data;
  }

  const getValues = (fieldName: string): string[] | undefined => {
    const field = data.value.field_data.find(f => f.name === fieldName);
    if (field && 'values' in field && isLeadgenFieldDataValues(field.values)) {
      return field.values;
    }
  };

  const emailAddresses = getValues(form.emailAddressFieldName);
  if (!emailAddresses || emailAddresses.length === 0) {
    return failure(Error(`No email addresses found in change ${change.value.leadgen_id}`));
  }

  const firstName = getValues(form.nameFieldName)?.[0];

  const telephoneNumber = getValues(form.telephoneNumberFieldName)?.[0];

  const disclaimerValue = (searchString: string): boolean => {
    return data.value.custom_disclaimer_responses.some(r => r.checkbox_key.includes(searchString) && r.is_checked === '1');
  };

  const emailOptIn = disclaimerValue('additional_emails');
  const smsOptIn = disclaimerValue('sms_offers');

  const customFields: Record<string, string> = {};

  // go through every field we know about
  for (const [ submittedQuestion, customField ] of Object.entries(form.fieldMap)) {
    // if we have it set to undefined then skip it
    if (!customField) {
      continue;
    }

    // find the matching field in the payload
    const field = data.value.field_data.find(f => f.name === submittedQuestion);
    if (!field) {
      console.error(`form ${formId} doesn't have a '${submittedQuestion}' field`);
      continue;
    }

    // make sure the field object has a values key
    if (!('values' in field)) {
      console.error(`form ${formId}'s '${submittedQuestion}' field doesn't have a \`values\` key`);
      continue;
    }

    // make sure the values value is string[]
    if (!isLeadgenFieldDataValues(field.values)) {
      console.error(`form ${formId}'s '${submittedQuestion}' field has an unexpected \`values\` format`);
      continue;
    }

    // get the first value
    const firstFieldValue = field.values[0];
    if (typeof firstFieldValue === 'undefined') {
      console.error(`form ${formId}'s '${submittedQuestion}' field has an empty \`values\` value`);
      continue;
    }

    // find the matching value to store
    const storedValue = customField.valuesMap[firstFieldValue];
    if (!storedValue) {
      console.error(`form ${formId}'s '${submittedQuestion}' field \`values\` value ('${firstFieldValue}') is missing from the valuesMap`);
      continue;
    }

    customFields[customField.name] = storedValue;
  }

  // make sure we're not missing any fields in our map
  for (const field of data.value.field_data) {
    if (field.name === form.nameFieldName) {
      continue;
    }
    if (field.name === form.emailAddressFieldName) {
      continue;
    }
    if (field.name === form.telephoneNumberFieldName) {
      continue;
    }
    if (Object.hasOwn(form.fieldMap, field.name)) {
      continue;
    }
    console.error(`field '${field.name}' not found in form ${formId}`);
  }

  return store(page, form.required, form.optIn, emailAddresses, [ data.value.field_data, data.value.custom_disclaimer_responses ], emailOptIn, smsOptIn, firstName, telephoneNumber);
};

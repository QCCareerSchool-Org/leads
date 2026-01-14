import type { Result } from 'generic-result-type';
import { fail, success } from 'generic-result-type';

import type { FBLeadgenChange } from '#src/domain/facebook/change/leadgen.mjs';
import { isFBLeadgenChange } from '#src/domain/facebook/change/leadgen.mjs';
import type { FBPayload } from '#src/domain/facebook/payload.mjs';
import type { SchoolSlug } from '#src/domain/school.mjs';
import { createBrevoContact, sendBrevoEmail } from '#src/lib/brevo.mjs';
import { logWarning } from '#src/logger.mjs';

/**
 * Acts on a payload
 * @param payload the payload
 * @param schoolSlug get rid of this once the old endpoint is decommissioned
 * @returns a Result type indicating the number of changes processed
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fbPayload = async (payload: FBPayload, schoolSlug?: SchoolSlug): Promise<Result<number>> => {
  const errors: Error[] = [];
  let total = 0;

  for (const entry of payload.entry) {
    for (const change of entry.changes) {
      if (isFBLeadgenChange(change)) {
        const result = await fbLeadgenChange(change);
        if (!result.success) {
          errors.push(result.error);
        } else {
          total++;
        }
      } else {
        logWarning(`Unhandled change for entry ${entry.id}`, change);
      }
    }
  }

  if (errors.length) {
    return fail(Error(errors.map(e => e.message).join('\n')));
  }

  return success(total);
};

/**
 * Acts on a change
 * @param change the change
 * @returns a Result type
 */
const fbLeadgenChange = async (change: FBLeadgenChange): Promise<Result> => {
  const form = formMap[change.value.form_id];
  if (!form) {
    return fail(Error(`form "${change.value.form_id}" not found in form map`));
  }

  const data = await getLeadGen(change.value.leadgen_id, 'ddddd');
  if (!data.success) {
    return fail(data.error);
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

  return success(undefined);
};

type FormMap = Record<string, { listIds?: number[]; emailTemplateId?: number } | undefined>;

const formMap: FormMap = {
  1510363700231237: { listIds: [ 77 ], emailTemplateId: 32 },
  1: { listIds: [], emailTemplateId: 54 },
};

const addToBrevo = async (emailAddress: string, firstName?: string, phoneNumber?: string, listIds?: number[], emailTemplateId?: number): Promise<Result> => {
  const errors: Error[] = [];
  if (listIds) {
    if (listIds.length === 0) {
      logWarning(`no list ids found`);
    }
    const createContactResult = await createBrevoContact(emailAddress, firstName, undefined, undefined, undefined, undefined, listIds, phoneNumber);
    if (!createContactResult.success) {
      const createContactResult2 = await createBrevoContact(emailAddress, firstName, undefined, undefined, undefined, undefined, listIds);
      if (!createContactResult2.success) {
        errors.push(Error(`Could not create brevo contact`));
      }
    }
  }

  if (emailTemplateId) {
    console.log(`sending email template ${emailTemplateId}`);
    const sendTemplateResult = await sendBrevoEmail(emailTemplateId, emailAddress, firstName);
    if (!sendTemplateResult.success) {
      errors.push(Error('Unable to send template'));
    }
  }

  if (errors.length) {
    return fail(Error(errors.map(e => e.message).join('\n')));
  }

  return success(undefined);
};

interface LeadGen {
  /** string date */
  created_time: string;
  id: string;
  ad_id: string;
  form_id: string;
  field_data: LeadGenFieldData[];
}

interface LeadGenFieldData {
  name: string;
  values: string[];
}

const isLeadGen = (obj: unknown): obj is LeadGen => {
  return obj !== null && typeof obj === 'object' &&
    'created_time' in obj && typeof obj.created_time === 'string' &&
    'id' in obj && typeof obj.id === 'string' &&
    'ad_id' in obj && typeof obj.ad_id === 'string' &&
    'form_id' in obj && typeof obj.form_id === 'string' &&
    'field_data' in obj && Array.isArray(obj.field_data) && obj.field_data.every(isLeadGenFieldData);
};

const isLeadGenFieldData = (obj: unknown): obj is LeadGenFieldData => {
  return obj !== null && typeof obj === 'object' &&
    'name' in obj && typeof obj.name === 'string' &&
    'values' in obj && Array.isArray(obj.values) && obj.values.every(v => typeof v === 'string');
};

const getLeadGen = async (leadId: string, accessToken: string): Promise<Result<LeadGen>> => {
  // eslint-disable-next-line camelcase
  const params = new URLSearchParams({ access_token: accessToken });
  const response = await fetch(`https://graph.facebook.com/v24.0/${leadId}?${params.toString()}`);
  if (!response.ok) {
    return fail(Error(response.statusText));
  }
  const body = await response.json();
  if (!isLeadGen(body)) {
    return fail(Error('Unexpected response'));
  }
  return success(body);
};

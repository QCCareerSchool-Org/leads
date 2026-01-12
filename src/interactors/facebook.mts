import type { ResultType } from 'generic-result-type';
import { Result } from 'generic-result-type';

import { logWarning } from '#src/logger.mjs';
import { type FBLeadGenChange, type FBPayload, type FBVerification, isFBLeadGenChange } from '../domain/facebook.mjs';
import type { SchoolSlug } from '../domain/school.mjs';
import { createBrevoContact, sendBrevoEmail } from '../lib/brevo.mjs';

const verifyToken = process.env.FB_VERIFY_TOKEN;
if (!verifyToken) {
  throw Error('Environment variable FB_VERIFY_TOKEN not found');
}

export const verify = (payload: FBVerification): ResultType<number> => {
  console.log('expecter', verifyToken);
  console.log('received', payload['hub.verify_token']);
  if (payload['hub.verify_token'] !== verifyToken) {
    return Result.fail(Error('hub.verify_token mismatch'));
  }
  return Result.success(payload['hub.challenge']);
};

export const storeLeadGenChanges = async (payload: FBPayload, schoolSlug: SchoolSlug): Promise<ResultType<number>> => {
  const errors: Error[] = [];

  for (const entry of payload.entry) {
    for (const change of entry.changes) {
      if (!isFBLeadGenChange(change)) {
        continue;
      }

      const result = await storeLeadGenChange(change, schoolSlug);
      if (!result.success) {
        errors.push(result.error);
      }
    }
  }

  if (errors.length) {
    return Result.fail(Error(errors.map(e => e.message).join('\n')));
  }

  return Result.success(0);
};

const storeLeadGenChange = async (change: FBLeadGenChange, schoolSlug: SchoolSlug): Promise<ResultType<void>> => {
  const formMap = schoolMap[schoolSlug];
  if (!formMap) {
    return Result.fail(Error(`form map for school ${schoolSlug} not found`));
  }

  const form = formMap[change.value.form_id];
  if (!form) {
    return Result.fail(Error(`form "${change.value.form_id}" not found in form map for ${schoolSlug}`));
  }

  const emailAddresses = change.value.field_data.find(f => f.name === 'email')?.values;
  if (!emailAddresses || emailAddresses.length === 0) {
    return Result.fail(Error(`No email addresses found in change ${change.value.leadgen_id}`));
  }

  const firstNames = change.value.field_data.find(f => f.name === 'first_name')?.values;

  const phoneNumbers = change.value.field_data.find(f => f.name === 'phone_number')?.values;

  const errors: Error[] = [];
  for (const emailAddress of emailAddresses) {
    const result = await newFunction(emailAddress, firstNames?.[0], phoneNumbers?.[0], form.listIds, form.emailTemplateId);
    if (!result.success) {
      errors.push(result.error);
    }
  }

  if (errors.length > 0) {
    return Result.fail(Error(errors.map(e => e.message).join('\n')));
  }

  return Result.success(undefined);
};

type FormMap = Record<string, { listIds?: number[]; emailTemplateId?: number } | undefined>;
type SchoolMap = Partial<Record<SchoolSlug, FormMap>>;

const schoolMap: SchoolMap = {
  makeup: {
    1510363700231237: { listIds: [ 77 ], emailTemplateId: 32 },
    1: { listIds: [], emailTemplateId: 54 },
  },
};

const newFunction = async (emailAddress: string, firstName?: string, phoneNumber?: string, listIds?: number[], emailTemplateId?: number): Promise<ResultType<void>> => {
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
    return Result.fail(Error(errors.map(e => e.message).join('\n')));
  }

  return Result.success(undefined);
};

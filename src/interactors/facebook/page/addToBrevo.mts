import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import type { SchoolName } from '#src/domain/school.mjs';
import type { BrevoAttributes } from '#src/lib/brevo.mjs';
import { sendBrevoEmail } from '#src/lib/brevo.mjs';
import { createBrevoContact } from '#src/lib/brevo.mjs';
import { logWarning } from '#src/logger.mjs';

export const addToBrevo = async (schoolName: SchoolName, emailAddress: string, firstName?: string, phoneNumber?: string, listIds?: number[], emailTemplateId?: number): Promise<Result> => {
  const errors: Error[] = [];
  if (listIds) {
    if (listIds.length === 0) {
      logWarning(`no list ids found`);
    }
    const attributes = getAttributes(schoolName);
    const createContactResult = await createBrevoContact(emailAddress, firstName, undefined, undefined, undefined, undefined, attributes, listIds, phoneNumber);
    if (!createContactResult.success) {
      const createContactResult2 = await createBrevoContact(emailAddress, firstName, undefined, undefined, undefined, undefined, attributes, listIds);
      if (!createContactResult2.success) {
        errors.push(Error(`Could not create brevo contact`));
      }
    }
  }

  if (emailTemplateId) {
    const sendTemplateResult = await sendBrevoEmail(emailTemplateId, emailAddress, firstName);
    if (!sendTemplateResult.success) {
      errors.push(Error('Unable to send template'));
    }
  }

  if (errors.length) {
    return failure(Error(errors.map(e => e.message).join('\n')));
  }

  return success();
};

const getAttributes = (schoolName: SchoolName): BrevoAttributes => {
  const attributes: BrevoAttributes = { SOURCE: 'Facebook' };
  switch (schoolName) {
    case 'QC Design School':
      attributes.STATUS_DESIGN_LEAD = true;
      break;
    case 'QC Event School':
      attributes.STATUS_EVENT_LEAD = true;
      break;
    case 'QC Makeup Academy':
      attributes.STATUS_MAKEUP_LEAD = true;
      break;
    case 'QC Pet Studies':
      attributes.STATUS_PET_LEAD = true;
      break;
    case 'QC Wellness Studies':
      attributes.STATUS_WELLNESS_LEAD = true;
      break;
    default:
      logWarning(`Unexpected school name${schoolName}--attribute not set`);
  }
  return attributes;
};

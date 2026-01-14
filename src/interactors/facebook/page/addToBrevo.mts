import type { Result } from 'generic-result-type';
import { success } from 'generic-result-type';

// import { sendBrevoEmail } from '#src/lib/brevo.mjs';
// import { createBrevoContact } from '#src/lib/brevo.mjs';
// import { logWarning } from '#src/logger.mjs';

export const addToBrevo = async (emailAddress: string, firstName?: string, phoneNumber?: string, listIds?: number[], emailTemplateId?: number): Promise<Result> => {
  console.log(emailAddress, firstName, phoneNumber, listIds, emailTemplateId);
  return success();

  // const errors: Error[] = [];
  // if (listIds) {
  //   if (listIds.length === 0) {
  //     logWarning(`no list ids found`);
  //   }
  //   const createContactResult = await createBrevoContact(emailAddress, firstName, undefined, undefined, undefined, undefined, listIds, phoneNumber);
  //   if (!createContactResult.success) {
  //     const createContactResult2 = await createBrevoContact(emailAddress, firstName, undefined, undefined, undefined, undefined, listIds);
  //     if (!createContactResult2.success) {
  //       errors.push(Error(`Could not create brevo contact`));
  //     }
  //   }
  // }

  // if (emailTemplateId) {
  //   console.log(`sending email template ${emailTemplateId}`);
  //   const sendTemplateResult = await sendBrevoEmail(emailTemplateId, emailAddress, firstName);
  //   if (!sendTemplateResult.success) {
  //     errors.push(Error('Unable to send template'));
  //   }
  // }

  // if (errors.length) {
  //   return fail(Error(errors.map(e => e.message).join('\n')));
  // }

  // return success();
};

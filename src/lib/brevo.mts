import type { Brevo } from '@getbrevo/brevo';
import { BrevoClient } from '@getbrevo/brevo';
import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

const apiKey = process.env.BREVO_API_KEY ?? '';

const brevo = new BrevoClient({ apiKey, baseUrl: 'https://proxy.qccareerschool.com/brevo/v3/', headers: { 'X-Secret': process.env.PROXY_SECRET } });

export type Source = 'Facebook';

export interface BrevoAttributes {
  FIRSTNAME?: string;
  LASTNAME?: string;
  COUNTRY_CODE?: string;
  PROVINCE_CODE?: string;
  CITY?: string;
  SMS?: string;

  STATUS_DESIGN_LEAD?: true;
  STATUS_DESIGN_STUDENT?: true;
  STATUS_EVENT_LEAD?: true;
  STATUS_EVENT_STUDENT?: true;
  STATUS_MAKEUP_LEAD?: true;
  STATUS_MAKEUP_STUDENT?: true;
  STATUS_PET_LEAD?: true;
  STATUS_PET_STUDENT?: true;
  STATUS_WELLNESS_LEAD?: true;
  STATUS_WELLNESS_STUDENT?: true;
  STATUS_WRITING_LEAD?: true;
  STATUS_WRITING_STUDENT?: true;
  SOURCE?: Source;
}

export const createBrevoContact = async (
  emailAddress: string,
  firstName?: string,
  lastName?: string,
  countryCode?: string,
  provinceCode?: string | null,
  city?: string | null,
  attributes?: BrevoAttributes,
  listIds?: number[],
  telephoneNumber?: string,
): Promise<Result<number>> => {
  const request: Brevo.CreateContactRequest = {
    email: emailAddress,
    listIds,
    updateEnabled: true,
    attributes: {
      ...attributes,
      ...(typeof firstName !== 'undefined' ? { FIRSTNAME: firstName } : undefined),
      ...(typeof lastName !== 'undefined' ? { LASTNAME: lastName } : undefined),
      ...(typeof countryCode !== 'undefined' ? { COUNTRY_CODE: countryCode.toLocaleUpperCase() } : undefined),
      ...(typeof provinceCode !== 'undefined' ? { PROVINCE_CODE: provinceCode?.toLocaleUpperCase() } : undefined),
      ...(typeof city !== 'undefined' ? { CITY: city ?? '' } : undefined),
      ...(typeof telephoneNumber !== 'undefined' ? { SMS: telephoneNumber } : undefined),
    },
  };

  try {
    const response = await brevo.contacts.createContact(request);

    if (typeof response?.id !== 'undefined') {
      return success(response.id);
    }

    return failure(Error('Could not add contact'));
  } catch (err) {
    if (err instanceof Error) {
      return failure(err);
    }
    return failure(Error('Unknown error'));
  }
};

export const sendBrevoEmail = async (templateId: number, emailAddress: string, name?: string): Promise<Result<string>> => {
  const to = name ? [ { email: emailAddress, name } ] : [ { email: emailAddress } ];

  const request: Brevo.SendTransacEmailRequest = { to, templateId };

  try {
    const response = await brevo.transactionalEmails.sendTransacEmail(request);

    if (typeof response.messageId !== 'undefined') {
      return success(response.messageId);
    }

    return failure(Error('Could send email'));
  } catch (err) {
    if (err instanceof Error) {
      return failure(err);
    }
    return failure(Error('Unknown error'));
  }
};

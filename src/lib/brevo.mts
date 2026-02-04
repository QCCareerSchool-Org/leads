import * as brevo from '@getbrevo/brevo';
import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

const brevoApiKey = process.env.BREVO_API_KEY ?? '';

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
  try {
    const contactsApi = new brevo.ContactsApi();
    contactsApi.setApiKey(brevo.ContactsApiApiKeys.apiKey, brevoApiKey);

    const body = {
      email: emailAddress,
      listIds,
      updateEnabled: true,
      attributes: {
        ...attributes,
      } as BrevoAttributes,
    } satisfies brevo.CreateContact;

    if (typeof firstName !== 'undefined') {
      (body.attributes).FIRSTNAME = firstName;
    }
    if (typeof lastName !== 'undefined') {
      (body.attributes).LASTNAME = lastName;
    }
    if (typeof countryCode !== 'undefined') {
      (body.attributes).COUNTRY_CODE = countryCode.toLocaleUpperCase();
    }
    if (typeof provinceCode !== 'undefined') {
      (body.attributes).PROVINCE_CODE = provinceCode === null ? '' : provinceCode.toLocaleUpperCase();
    }
    if (typeof city !== 'undefined') {
      (body.attributes).CITY = city ?? '';
    }
    if (typeof telephoneNumber !== 'undefined') {
      (body.attributes).SMS = telephoneNumber;
    }

    const result = await contactsApi.createContact(body);

    if (result.response.statusCode && (result.response.statusCode >= 200 && result.response.statusCode < 300)) {
      return success(result.response.statusCode);
    }

    return failure(Error(result.response.statusMessage));
  } catch (err) {
    if (err instanceof Error) {
      return failure(err);
    }
    return failure(Error('Unknown error'));
  }
};

export const sendBrevoEmail = async (templateId: number, emailAddress: string, name?: string): Promise<Result<string>> => {
  try {
    const transactionalEmailsApi = new brevo.TransactionalEmailsApi();
    transactionalEmailsApi.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, brevoApiKey);

    const result = await transactionalEmailsApi.sendTransacEmail({
      to: name ? [ { email: emailAddress, name } ] : [ { email: emailAddress } ],
      templateId,
      // params: { name },
      // headers: {
      //   'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2',
      // },
    });

    if (result.body.messageId) {
      return success(result.body.messageId);
    }

    return failure(Error(result.response.statusMessage));
  } catch (err) {
    if (err instanceof Error) {
      return failure(err);
    }
    return failure(Error('Unknown error'));
  }
};

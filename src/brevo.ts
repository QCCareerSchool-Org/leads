import * as brevo from '@getbrevo/brevo';

import type { ResultType } from './result.js';
import { Result } from './result.js';

const brevoApiKey = process.env.BREVO_API_KEY ?? '';

export type Source = 'Facebook';

export interface BrevoAttributes {
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
  attributes?: BrevoAttributes,
  listIds?: number[],
  telephoneNumber?: string,
): Promise<ResultType<number>> => {
  try {
    const contactsApi = new brevo.ContactsApi();
    contactsApi.setApiKey(brevo.ContactsApiApiKeys.apiKey, brevoApiKey);

    const body = {
      email: emailAddress,
      listIds,
      updateEnabled: true,
      attributes: {
        ...attributes,
      },
    } satisfies brevo.CreateContact;

    if (typeof firstName !== 'undefined') {
      (body.attributes as Record<string, unknown>).FIRSTNAME = firstName;
    }
    if (typeof lastName !== 'undefined') {
      (body.attributes as Record<string, unknown>).LASTNAME = lastName;
    }
    if (typeof countryCode !== 'undefined') {
      (body.attributes as Record<string, unknown>).COUNTRY_CODE = countryCode.toLocaleUpperCase();
    }
    if (typeof provinceCode !== 'undefined') {
      (body.attributes as Record<string, unknown>).PROVINCE_CODE = provinceCode === null ? '' : provinceCode.toLocaleUpperCase();
    }
    if (typeof telephoneNumber !== 'undefined') {
      (body.attributes as Record<string, unknown>).SMS = telephoneNumber;
    }

    const result = await contactsApi.createContact(body);

    if (result.body.id) {
      return Result.success(result.body.id);
    }

    return Result.fail(Error(result.response.statusMessage));
  } catch (err) {
    if (err instanceof Error) {
      return Result.fail(err);
    }
    return Result.fail(Error('Unknown error'));
  }
};

export const sendBrevoEmail = async (templateId: number, emailAddress: string, name?: string): Promise<ResultType<string>> => {
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
      return Result.success(result.body.messageId);
    }

    return Result.fail(Error(result.response.statusMessage));
  } catch (err) {
    if (err instanceof Error) {
      return Result.fail(err);
    }
    return Result.fail(Error('Unknown error'));
  }
};

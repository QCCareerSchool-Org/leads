import type { Request, Response } from 'express';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import type { BrevoAttributes } from './brevo';
import { createBrevoContact, sendBrevoEmail } from './brevo';
import { storeLead } from './leads';
import { logError } from './logger';
import type { ResultType } from './result';
import { Result } from './result';
import type { SchoolName } from './school';
import { schools } from './school';

export const handleLeadsPostForm = async (req: Request, res: Response): Promise<void> => {
  const validated = await validatePostLeadRequest(req.body);

  if (!validated.success) {
    res.status(400).send(validated.error.message);
    logError('Validation error', validated.error.message);
    return;
  }

  const request = validated.value;

  let successUrl: URL;
  try {
    successUrl = new URL(request.successLocation);
  } catch (err) {
    logError('Invalid URL', err);
    res.status(400).send(err);
    return;
  }

  const countryCode = res.locals.geoLocation?.countryCode;
  const provinceCode = res.locals.geoLocation?.provinceCode;
  const city = res.locals.geoLocation?.city;

  const attributes = getAttributes(request.school);

  if (!await createBrevoContact(request.emailAddress, request.firstName, request.lastName, countryCode, provinceCode, attributes, request.emailOptIn && typeof request.listId !== 'undefined' ? [ request.listId ] : undefined)) {
    logError('Could not create Brevo contact');
  }

  if (request.emailTemplateId) {
    if (!await sendBrevoEmail(request.emailTemplateId, request.emailAddress, request.firstName)) {
      logError('Could not send Brevo email');
    }
  }

  const storeLeadResponse = await storeLead({
    ipAddress: res.locals.ipAddress || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    school: request.school,
    emailAddress: request.emailAddress,
    firstName: request.firstName || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    lastName: request.lastName || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    telephoneNumber: request.telephoneNumber || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    emailOptIn: request.emailOptIn ?? null,
    smsOptIn: request.smsOptIn ?? null,
    countryCode: countryCode || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    provinceCode: provinceCode || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    city: city || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    gclid: request.gclid || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    msclkid: request.msclkid || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    marketing: {
      source: request.utmSource ?? null,
      medium: request.utmMedium ?? null,
      campaign: request.utmCampaign ?? null,
      content: request.utmContent ?? null,
      term: request.utmTerm ?? null,
    },
    courses: request.courseCodes,
    browserName: res.locals.browser?.name || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    browserVersion: res.locals.browser?.version || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    os: res.locals.browser?.os || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    mobile: res.locals.browser?.mobile ?? null,
  });

  if (storeLeadResponse.success) {
    successUrl.searchParams.set('emailAddress', request.emailAddress);
    successUrl.searchParams.set('emailOptIn', request.emailOptIn ? '1' : '0');
    if (request.firstName) {
      successUrl.searchParams.set('firstName', request.firstName);
    }
    if (request.lastName) {
      successUrl.searchParams.set('lastName', request.lastName);
    }
    if (request.lastName) {
      successUrl.searchParams.set('lastName', request.lastName);
    }
    res.redirect(303, successUrl.href);
  } else {
    logError('Unable to store lead', storeLeadResponse.error.message);
    switch (storeLeadResponse.error.constructor) {
      default:
        res.status(500).send(storeLeadResponse.error.message);
    }
  }
};

type PostLeadRequest = {
  school: SchoolName;
  successLocation: string;
  emailAddress: string;
  firstName?: string;
  lastName?: string;
  telephoneNumber?: string;
  emailOptIn?: boolean;
  smsOptIn?: boolean;
  gclid?: string;
  msclkid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  courseCodes?: string[];
  emailTemplateId?: number;
  listId?: number;
};

const schema = zfd.formData({
  school: zfd.text(z.enum(schools)),
  successLocation: zfd.text(z.string().regex(/^http(s?):\/\//ui)),
  emailAddress: zfd.text(z.string().email()),
  firstName: zfd.text(z.string().max(191).optional()),
  lastName: zfd.text(z.string().max(191).optional()),
  telephoneNumber: zfd.text(z.string().optional()),
  emailOptIn: zfd.checkbox(),
  smsOptIn: zfd.checkbox(),
  gclid: zfd.text(z.string().optional()),
  msclkid: zfd.text(z.string().optional()),
  utmSource: zfd.text(z.string().optional()),
  utmMedium: zfd.text(z.string().optional()),
  utmCampaign: zfd.text(z.string().optional()),
  utmContent: zfd.text(z.string().optional()),
  utmTerm: zfd.text(z.string().optional()),
  courseCodes: zfd.repeatableOfType(z.string()).optional(),
  emailTemplateId: zfd.numeric(z.number().optional()),
  listId: zfd.numeric(z.number().multipleOf(1).optional()),
});

const validatePostLeadRequest = async (requestBody: Request['body']): Promise<ResultType<PostLeadRequest>> => {
  try {
    const body = await schema.parseAsync(await requestBody);
    return Result.success(body);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'invalid request';
    return Result.fail(Error(message));
  }
};

const getAttributes = (schoolName: SchoolName): BrevoAttributes => {
  switch (schoolName) {
    case 'QC Design School':
      return { STATUS_DESIGN_LEAD: true };
    case 'QC Event School':
      return { STATUS_EVENT_LEAD: true };
    case 'QC Makeup Academy':
      return { STATUS_MAKEUP_LEAD: true };
    case 'QC Pet Studies':
      return { STATUS_PET_LEAD: true };
    case 'QC Wellness Studies':
      return { STATUS_WELLNESS_LEAD: true };
    case 'Winghill Writing School':
      return { STATUS_WRITING_LEAD: true };
  }
};

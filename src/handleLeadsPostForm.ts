import escapeHtml from 'escape-html';
import type { Request, Response } from 'express';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import type { BrevoAttributes } from './brevo';
import { createBrevoContact, sendBrevoEmail } from './brevo';
import { getLeadByNonce, storeLead } from './leads';
import { logError } from './logger';
import { validateCaptcha } from './reCaptcha';
import type { ResultType } from './result';
import { Result } from './result';
import type { SchoolName } from './school';
import { schools } from './school';

export const handleLeadsPostForm = async (req: Request, res: Response): Promise<void> => {
  if (typeof req.body.emailAddress === 'undefined') {
    res.status(200).end();
    return;
  }

  const validated = await validatePostLeadRequest(req.body);

  if (!validated.success) {
    logError('Validation error', { error: validated.error.message, body: req.body, referrer: req.headers.referer });
    try {
      const errors = JSON.parse(validated.error.message) as Array<{ validation: string }>;
      if (errors.some(e => e.validation === 'email')) {
        let message = '<h1>Invalid Data</h1>';
        message += '<p>There appears to be an issue with your email address. We received <strong>"' + escapeHtml(req.body.emailAddress) + '"</strong>.';
        if (typeof req.body.emailAddress === 'string' && !req.body.emailAddress.includes('.')) {
          message += ' Are you missing a TLD like ".com"?';
        }
        message += '</p>';
        message += '<p>Please go back to the previous page and verify that you entered the correct address.</p>';
        res.status(400).send(message);
        return;
      }
    } catch (err) { /* empty */ }
    res.status(400).send(validated.error.message);
    return;
  }

  const request = validated.value;

  const captchaResult = await validateCaptcha(request['g-recaptcha-response'], res.locals.ipAddress);
  if (captchaResult.success) {
    if (!captchaResult.value.success) {
      logError('Captcha validation failed', { body: req.body, referrer: req.headers.referer, captchaResponse: captchaResult.value, captchaErrorCodes: captchaResult.value['error-codes'] });
      res.status(400).send('captcha validation failed');
      return;
    }
  } else {
    logError(captchaResult.error.message);
  }

  let successUrl: URL;
  try {
    successUrl = new URL(request.successLocation);
  } catch (err) {
    logError('Invalid URL', { error: err, referrer: req.headers.referer });
    res.status(400).send(err);
    return;
  }

  const countryCode = res.locals.geoLocation?.countryCode;
  const provinceCode = res.locals.geoLocation?.provinceCode;
  const city = res.locals.geoLocation?.city;

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
  if (countryCode) {
    successUrl.searchParams.set('countryCode', countryCode);
  }
  if (provinceCode) {
    successUrl.searchParams.set('provinceCode', provinceCode);
  }

  // don't do any processing if we've already recorded a lead with this nonce
  if (request.nonce) {
    const leadResult = await getLeadByNonce(request.nonce);
    if (leadResult.success && leadResult.value !== false) {
      successUrl.searchParams.set('leadId', leadResult.value.leadId);
      res.redirect(303, successUrl.href);
      return;
    }
  }

  const marketing = request.utmSource || request.utmMedium || request.utmCampaign || request.utmContent || request.utmTerm
    ? {
      source: request.utmSource || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
      medium: request.utmMedium || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
      campaign: request.utmCampaign || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
      content: request.utmContent || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
      term: request.utmTerm || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    }
    : undefined;

  const newLeadResult = await storeLead({
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
    marketing,
    courses: request.courseCodes,
    browserName: res.locals.browser?.name || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    browserVersion: res.locals.browser?.version || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    os: res.locals.browser?.os || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    mobile: res.locals.browser?.mobile ?? null,
    nonce: request.nonce,
  });

  const attributes = getAttributes(request.school);

  const createContactResult = await createBrevoContact(request.emailAddress, request.firstName, request.lastName, countryCode, provinceCode, attributes, request.emailOptIn && typeof request.listId !== 'undefined' ? [ request.listId ] : undefined);
  if (!createContactResult.success) {
    logError('Could not create Brevo contact', { body: req.body, referrer: req.headers.referer, error: createContactResult.error });
  }

  if (request.emailTemplateId) {
    const sendEmailResult = await sendBrevoEmail(request.emailTemplateId, request.emailAddress, request.firstName);
    if (!sendEmailResult.success) {
      logError('Could not send Brevo email', { body: req.body, referrer: req.headers.referer, error: sendEmailResult.error });
    }
  }

  if (newLeadResult.success) {
    successUrl.searchParams.set('leadId', newLeadResult.value.leadId);
    res.redirect(303, successUrl.href);
  } else {
    logError('Unable to store lead', { error: newLeadResult.error.message, referrer: req.headers.referer });
    switch (newLeadResult.error.constructor) {
      default:
        res.status(500).send(newLeadResult.error.message);
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
  nonce?: string;
  'g-recaptcha-response': string;
};

const schema = zfd.formData({
  'school': zfd.text(z.enum(schools)),
  'successLocation': zfd.text(z.string().regex(/^http(s?):\/\//ui)),
  'emailAddress': zfd.text(z.string().email()),
  'firstName': zfd.text(z.string().max(191).optional()),
  'lastName': zfd.text(z.string().max(191).optional()),
  'telephoneNumber': zfd.text(z.string().optional()),
  'emailOptIn': zfd.checkbox(),
  'smsOptIn': zfd.checkbox(),
  'gclid': zfd.text(z.string().optional()),
  'msclkid': zfd.text(z.string().optional()),
  'utmSource': zfd.text(z.string().optional()),
  'utmMedium': zfd.text(z.string().optional()),
  'utmCampaign': zfd.text(z.string().optional()),
  'utmContent': zfd.text(z.string().optional()),
  'utmTerm': zfd.text(z.string().optional()),
  'courseCodes': zfd.repeatableOfType(z.string()).optional(),
  'emailTemplateId': zfd.numeric(z.number().optional()),
  'listId': zfd.numeric(z.number().multipleOf(1).optional()),
  'nonce': zfd.text(z.string().uuid().optional()),
  'g-recaptcha-response': zfd.text(),
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

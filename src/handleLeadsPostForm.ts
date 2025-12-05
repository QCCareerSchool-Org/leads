import fs from 'fs';
import path from 'path';
import escapeHtml from 'escape-html';
import type { Request, Response } from 'express';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import type { BrevoAttributes } from './brevo';
import { createBrevoContact, sendBrevoEmail } from './brevo';
import { getContactURL } from './contactUrl';
import { delay } from './delay';
import { PostLeadRequest } from './domain/postLeadRequest';
import type { SchoolName } from './domain/school';
import { isSchoolName, schools } from './domain/school';
import { getName } from './getName';
import { invalidCountry } from './invalidCountry';
import { isGibberish } from './isGibberish';
import { getLeadByNonce, storeLead } from './leads';
import { logError, logWarning } from './logger';
import { validateCaptcha } from './reCaptcha';
import type { ResultType } from './result';
import { Result } from './result';

const browserErrorHtml = fs.readFileSync(path.join(__dirname, '../html/browserError.html'), 'utf-8');
const invalidEmailAddressHtml = fs.readFileSync(path.join(__dirname, '../html/invalidEmailAddress.html'), 'utf-8');

export const handleLeadsPostForm = async (req: Request, res: Response): Promise<void> => {
  const countryCode = res.locals.geoLocation?.countryCode;
  const provinceCode = res.locals.geoLocation?.provinceCode;
  const city = res.locals.geoLocation?.city;

  const formUrl = getFormUrl(req.body);
  const requestBody = { ...req.body, referrer: req.headers.referer, formUrl, ipAddress: res.locals.ipAddress, detected: { countryCode, provinceCode, city } };

  const validated = await validatePostLeadRequest(req.body);

  // not a valid request
  if (!validated.success) {
    const school = isSchoolName(req.body.school) ? req.body.school : undefined;

    logWarning('Validation error', validated.error, requestBody);

    try {
      const errors = JSON.parse(validated.error.message) as Array<{ path: string[] }>;
      if (errors.some(e => e.path.includes('emailAddress'))) {
        res.status(400).send(invalidEmailAddressHtml.replace(/\$\{contactUrl\}/gu, getContactURL(school)).replace(/\$\{emailAddress\}/gu, escapeHtml(req.body.emailAddress)));
        return;
      }
      if (errors.some(e => e.path.includes('g-recaptcha-response'))) {
        res.status(400).send(browserErrorHtml.replace(/\$\{contactUrl\}/gu, getContactURL(school)));
        return;
      }
    } catch (err) { /* empty */ }

    res.status(400).send(validated.error.message);
    return;
  }

  const request = validated.value;

  let successUrl: URL;
  try {
    successUrl = new URL(request.successLocation);
  } catch (err) {
    logWarning('Invalid URL', err, requestBody);
    res.status(400).send(err);
    return;
  }

  if (isBot()) {
    await delay(8000);
    res.redirect(303, successUrl.href);
    return;
  }

  // captcha check
  const captchaResult = await validateCaptcha(request['g-recaptcha-response'], res.locals.ipAddress);
  if (captchaResult.success) {
    if (!captchaResult.value.success) {
      logWarning('Captcha validation failed', captchaResult.value, requestBody);
      if (captchaResult.value['error-codes']?.includes('browser-error')) {
        res.status(400).send(browserErrorHtml.replace(/\$\{contactUrl\}/gu, getContactURL(request.school)));
        return;
      }
      res.status(400).send('captcha validation failed');
      return;
    }
  } else {
    logError('Unable to process captcha', captchaResult.error, requestBody);
  }

  const [ firstName, lastName ] = getName(request.firstName, request.lastName);

  successUrl.searchParams.set('emailAddress', request.emailAddress);
  successUrl.searchParams.set('emailOptIn', request.emailOptIn ? '1' : '0');
  if (firstName) {
    successUrl.searchParams.set('firstName', firstName);
  }
  if (lastName) {
    successUrl.searchParams.set('lastName', lastName);
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

  const telephoneNumber = typeof request.telephoneNumber !== 'undefined' && /^\d{10}$/u.test(request.telephoneNumber)
    ? '+1' + request.telephoneNumber
    : request.telephoneNumber;

  const newLeadResult = await storeLead({
    ipAddress: res.locals.ipAddress || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    school: request.school,
    emailAddress: request.emailAddress,
    firstName: firstName || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    lastName: lastName || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    telephoneNumber: telephoneNumber || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    emailOptIn: request.emailOptIn ?? null,
    smsOptIn: request.smsOptIn ?? null,
    countryCode: countryCode || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    provinceCode: provinceCode || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    city: city || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    referrer: request.referrer || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
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

  if (request.referrer && /facebook/iu.test(request.referrer)) {
    attributes.SOURCE = 'Facebook';
  }

  // add "+1" to 10-digit phone numbers
  let listIds = request.emailOptIn && typeof request.listId !== 'undefined' ? [ request.listId ] : undefined;
  if (request.telephoneListId && telephoneNumber) {
    listIds = listIds ?? [];
    listIds.push(request.telephoneListId);
  }

  const createContactResult = await createBrevoContact(request.emailAddress, firstName, lastName, countryCode, provinceCode, attributes, listIds, telephoneNumber);
  if (!createContactResult.success) {
    logWarning('Could not create contact with telephone number', createContactResult.error, requestBody);
    // make a second attempt without the telephone number
    if (telephoneNumber) {
      const createContactResult2 = await createBrevoContact(request.emailAddress, firstName, lastName, countryCode, provinceCode, attributes, listIds);
      if (!createContactResult2.success) {
        logError('Could not create contact', createContactResult.error, requestBody);
      }
    }
  }

  if (request.emailTemplateId) {
    const sendEmailResult = await sendBrevoEmail(request.emailTemplateId, request.emailAddress, firstName);
    if (!sendEmailResult.success) {
      logError('Could not send email', sendEmailResult.error, requestBody);
    }
  }

  if (newLeadResult.success) {
    successUrl.searchParams.set('leadId', newLeadResult.value.leadId);
    res.redirect(303, successUrl.href);
  } else {
    logError('Unable to store lead', newLeadResult.error, requestBody);
    switch (newLeadResult.error.constructor) {
      default:
        res.status(500).send(newLeadResult.error.message);
    }
  }

  function isBot(): boolean {
    for (const key in req.body) {
      if (!Object.hasOwn(req.body, key)) {
        continue;
      }
      if (key.startsWith('hp_')) {
        if (req.body[key]) {
          logWarning('Honeypot field filled', requestBody);
          return true;
        }
      }
    }

    // email address same as first or last name
    if (request.emailAddress === request.firstName || request.emailAddress === request.lastName) {
      return true;
    }
    // first name and last name are similar
    if (typeof request.firstName !== 'undefined' && typeof request.lastName !== 'undefined' && request.firstName.length >= 8 && request.lastName.startsWith(request.firstName.substring(0, 9))) {
      return true;
    }
    if (invalidCountry(countryCode)) {
      return true;
    }
    if (request.firstName) {
      // too short
      if (request.firstName.length <= 1) {
        return true;
      }
      if (isGibberish(request.firstName)) {
        logWarning('Gibberish detected', requestBody);
        return true;
      }
    }
    if (request.lastName) {
      // too short
      if (request.lastName.length <= 1) {
        return true;
      }
      if (isGibberish(request.lastName)) {
        logWarning('Gibberish detected', requestBody);
        return true;
      }
    }
    return false;
  }
};

const schema = zfd.formData({
  'school': zfd.text(z.enum(schools)),
  'successLocation': zfd.text(z.string().regex(/^http(s?):\/\//ui)),
  'emailAddress': zfd.text(z.string().email()),
  'firstName': zfd.text(z.string().max(191).optional()),
  'lastName': zfd.text(z.string().max(191).optional()),
  'city': zfd.text(z.string().max(64).optional()),
  'hp_city': zfd.text(z.string().max(64).optional()),
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
  'telephoneListId': zfd.numeric(z.number().multipleOf(1).optional()),
  'nonce': zfd.text(z.string().uuid().optional()),
  'g-recaptcha-response': zfd.text(),
  'referrer': zfd.text(z.string().optional()),
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

const getFormUrl = (body: Record<string, string | undefined>): string | undefined => {
  if (!body.currentPage) {
    return;
  }

  const params = new URLSearchParams();
  if (body.gclid) {
    params.append('gclid', body.gclid);
  }
  if (body.msclkid) {
    params.append('msclkid', body.msclkid);
  }
  if (body.utmSource) {
    params.append('utm_source', body.utmSource);
  }
  if (body.utmMedium) {
    params.append('utm_medium', body.utmMedium);
  }
  if (body.utmCampaign) {
    params.append('utm_campaign', body.utmCampaign);
  }
  if (body.utmTerm) {
    params.append('utm_term', body.utmTerm);
  }
  return `${body.currentPage}?${params.toString()}`;
};

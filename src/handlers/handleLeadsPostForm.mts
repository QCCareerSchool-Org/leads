import escapeHtml from 'escape-html';
import type { Request, Response } from 'express';
import fs from 'fs';
import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { storeLead } from '#src/lib/storeLead.mjs';
import type { PostLeadRequest } from '../domain/postLeadRequest.mjs';
import type { SchoolName } from '../domain/school.mjs';
import { isSchoolName } from '../domain/school.mjs';
import { schools } from '../domain/school.mjs';
import { getLeadByNonce } from '../interactors/leads.mjs';
import type { BrevoAttributes } from '../lib/brevo.mjs';
import { createBrevoContact, sendBrevoEmail } from '../lib/brevo.mjs';
import { getContactURL } from '../lib/contactUrl.mjs';
import { createPayload } from '../lib/createPayload.mjs';
import { delay } from '../lib/delay.mjs';
import { getName } from '../lib/getName.mjs';
import { isBot } from '../lib/isBot.mjs';
import { validateCaptcha } from '../lib/reCaptcha.mjs';
import { logError, logInfo, logWarning } from '../logger.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const browserErrorHtml = fs.readFileSync(path.join(__dirname, '../../html/browserError.html'), 'utf-8');
const invalidEmailAddressHtml = fs.readFileSync(path.join(__dirname, '../../html/invalidEmailAddress.html'), 'utf-8');

export const handleLeadsPostForm = async (req: Request, res: Response): Promise<void> => {
  const countryCode = res.locals.geoLocation?.countryCode ?? 'US';
  const provinceCode = res.locals.geoLocation?.provinceCode;
  const city = res.locals.geoLocation?.city;

  const validated = await validatePostLeadRequest(req.body);

  // not a valid request
  if (!validated.success) {
    const isBody = (obj: unknown): obj is { school: string; emailAddress: string } => {
      return typeof obj === 'object' && obj !== null
        && 'school' in obj && typeof obj.school === 'string'
        && 'emailAddress' in obj && typeof obj.emailAddress === 'string';
    };

    const [ school, emailAddress ] = isBody(req.body) && isSchoolName(req.body.school)
      ? [ req.body.school, req.body.emailAddress ]
      : [ undefined, undefined ];

    logWarning('Validation error', validated.error, createPayload(req, res));

    try {
      const errors = JSON.parse(validated.error.message) as { path: string[] }[];
      if (errors.some(e => e.path.includes('emailAddress'))) {
        res.status(400).send(invalidEmailAddressHtml.replace(/\$\{contactUrl\}/gu, getContactURL(school)).replace(/\$\{emailAddress\}/gu, escapeHtml(emailAddress)));
        return;
      }
      if (errors.some(e => e.path.includes('g-recaptcha-response'))) {
        res.status(400).send(browserErrorHtml.replace(/\$\{contactUrl\}/gu, getContactURL(school)));
        return;
      }
    } catch { /* empty */ }

    res.status(400).send(validated.error.message);
    return;
  }

  const request = validated.value;

  let successUrl: URL;
  try {
    successUrl = new URL(request.successLocation);
  } catch (err) {
    logWarning('Invalid URL', err, createPayload(req, res));
    res.status(400).send(err);
    return;
  }

  const botStatus = isBot(req.body as Record<string, string | undefined>, countryCode);
  if (botStatus.result) {
    await delay(8000);
    logWarning(botStatus.message, createPayload(req, res));
    res.redirect(303, successUrl.href);
    return;
  }

  // captcha check
  const captchaResult = await validateCaptcha(request['g-recaptcha-response'], res.locals.ipAddress);
  if (captchaResult.success) {
    if (!captchaResult.value.success) {
      logWarning('Captcha validation failed', captchaResult.value, createPayload(req, res));
      if (captchaResult.value['error-codes']?.includes('browser-error')) {
        res.status(400).send(browserErrorHtml.replace(/\$\{contactUrl\}/gu, getContactURL(request.school)));
        return;
      }
      res.status(400).send('captcha validation failed');
      return;
    }
  } else {
    logError('Unable to process captcha', captchaResult.error, createPayload(req, res));
  }

  const [ firstName, lastName ] = getName(request.firstName, request.lastName);

  const additionalParameters: Record<string, string> = {};

  additionalParameters.emailAddress = request.emailAddress;
  successUrl.searchParams.set('emailAddress', request.emailAddress);

  additionalParameters.emailOptIn = request.emailOptIn ? '1' : '0';
  successUrl.searchParams.set('emailOptIn', request.emailOptIn ? '1' : '0');

  if (firstName) {
    additionalParameters.firstName = firstName;
    successUrl.searchParams.set('firstName', firstName);
  }
  if (lastName) {
    additionalParameters.lastName = lastName;
    successUrl.searchParams.set('lastName', lastName);
  }
  if (countryCode) {
    additionalParameters.countryCode = countryCode;
    successUrl.searchParams.set('countryCode', countryCode);
  }
  if (provinceCode) {
    additionalParameters.provinceCode = provinceCode;
    successUrl.searchParams.set('provinceCode', provinceCode);
  }

  // don't do any processing if we've already recorded a lead with this nonce
  if (request.nonce) {
    const leadResult = await getLeadByNonce(request.nonce);
    if (leadResult.success && leadResult.value !== false) {
      successUrl.searchParams.set('leadId', leadResult.value);
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
    countryCode: countryCode || null,
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
    fbFields: null,
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
  if (createContactResult.success) {
    logInfo('Created contact', createContactResult.value);
  } else {
    logWarning('Could not create contact with telephone number', createContactResult.error, createPayload(req, res));
    // make a second attempt without the telephone number
    if (telephoneNumber) {
      const createContactResult2 = await createBrevoContact(request.emailAddress, firstName, lastName, countryCode, provinceCode, attributes, listIds);
      if (createContactResult2.success) {
        logInfo('Created contact', createContactResult2.value);
      } else {
        logError('Could not create contact', createContactResult2.error, createPayload(req, res));
      }
    }
  }

  if (request.emailTemplateId) {
    const sendEmailResult = await sendBrevoEmail(request.emailTemplateId, request.emailAddress, firstName);
    if (sendEmailResult.success) {
      logInfo('Email sent', sendEmailResult.value);
    } else {
      logError('Could not send email', sendEmailResult.error, createPayload(req, res));
    }
  }

  if (newLeadResult.success) {
    additionalParameters.leadId = newLeadResult.value;
    for (const key of Object.keys(additionalParameters)) {
      // add to querystring (remove once front ends changed)
      successUrl.searchParams.set(key, additionalParameters[key]);
      // add to cookies
      res.cookie(key, additionalParameters[key], { httpOnly: true, secure: process.env.MODE !== 'development', sameSite: 'lax' });
    }
    res.redirect(303, successUrl.href);
  } else {
    logError('Unable to store lead', newLeadResult.error, createPayload(req, res));
    switch (newLeadResult.error.constructor) {
      default:
        res.status(500).send(newLeadResult.error.message);
    }
  }
};

const schema = zfd.formData({
  'school': zfd.text(z.enum(schools)),
  'successLocation': zfd.text(z.string().regex(/^http(s?):\/\//ui)),
  'emailAddress': zfd.text(z.email()),
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
  'nonce': zfd.text(z.uuid().optional()),
  'g-recaptcha-response': zfd.text(),
  'referrer': zfd.text(z.string().optional()),
});

const validatePostLeadRequest = async (requestBody: Request['body']): Promise<Result<PostLeadRequest>> => {
  try {
    const body = await schema.parseAsync(await requestBody);
    return success(body);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'invalid request';
    return failure(Error(message));
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

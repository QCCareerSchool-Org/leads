import type { Request, Response } from 'express';
import * as yup from 'yup';

import type { BrevoAttributes } from './brevo';
import { createBrevoContact, sendBrevoEmail } from './brevo';
import { storeLead } from './leads';
import { logError } from './logger';
import type { ResultType } from './result';
import { Result } from './result';
import type { SchoolName } from './school';
import { schools } from './school';

export const handleLeadsPostJSON = async (req: Request, res: Response): Promise<void> => {
  logError('JSON Endpoint Still Being Used', req.body, req.headers.referer);

  if (typeof req.body.emailAddress === 'undefined') {
    res.status(200).end();
    return;
  }

  const validated = await validatePostLeadRequest(req.body);

  if (!validated.success) {
    res.status(400).send({ message: validated.error.message });
    logError('Validation error', { error: validated.error.message, body: req.body, referrer: req.headers.referer });
    return;
  }

  const request = validated.value;

  const countryCode = res.locals.geoLocation?.countryCode;
  const provinceCode = res.locals.geoLocation?.provinceCode;
  const city = res.locals.geoLocation?.city;

  if (request.brevo) {
    if (!await createBrevoContact(request.emailAddress, request.firstName, request.lastName, countryCode, provinceCode, request.brevo.attributes, request.emailOptIn ? request.brevo.listIds : undefined)) {
      logError('Could not create Brevo contact', { body: req.body, referrer: req.headers.referer });
    }

    if (request.brevo.emailTemplateId) {
      if (!await sendBrevoEmail(request.brevo.emailTemplateId, request.emailAddress, request.firstName)) {
        logError('Could not send Brevo email', { body: req.body, referrer: req.headers.referer });
      }
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
    referrer: null,
    gclid: request.gclid || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    msclkid: request.msclkid || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    marketing: request.marketing,
    courses: request.courses,
    browserName: res.locals.browser?.name || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    browserVersion: res.locals.browser?.version || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    os: res.locals.browser?.os || null, // eslint-disable-line @typescript-eslint/prefer-nullish-coalescing
    mobile: res.locals.browser?.mobile ?? null,
  });

  if (storeLeadResponse.success) {
    res.send(storeLeadResponse.value);
  } else {
    logError('Unable to store lead', { error: storeLeadResponse.error.message, referrer: req.headers.referer });
    switch (storeLeadResponse.error.constructor) {
      default:
        res.status(500).send(storeLeadResponse.error.message);
    }
  }
};

type PostLeadRequest = {
  school: SchoolName;
  emailAddress: string;
  firstName?: string;
  lastName?: string;
  telephoneNumber?: string;
  emailOptIn?: boolean;
  smsOptIn?: boolean;
  gclid?: string;
  msclkid?: string;
  marketing?: {
    source: string | null;
    medium: string | null;
    campaign: string | null;
    content: string | null;
    term: string | null;
  };
  courses?: string[];
  brevo?: {
    attributes: BrevoAttributes;
    listIds?: number[];
    emailTemplateId?: number;
  };
};

const postLeadRequestSchema: yup.ISchema<PostLeadRequest> = yup.object({
  school: yup.string().oneOf(schools).defined(),
  emailAddress: yup.string().email().max(255).defined(),
  firstName: yup.string().max(255),
  lastName: yup.string().max(255),
  telephoneNumber: yup.string().max(255),
  emailOptIn: yup.boolean(),
  smsOptIn: yup.boolean(),
  gclid: yup.string(),
  msclkid: yup.string(),
  marketing: yup.object({
    source: yup.string().nullable().defined(),
    medium: yup.string().nullable().defined(),
    campaign: yup.string().nullable().defined(),
    content: yup.string().nullable().defined(),
    term: yup.string().nullable().defined(),
  }).default(undefined),
  courses: yup.array().of(yup.string().defined()),
  brevo: yup.object({
    attributes: yup.object({
      STATUS_DESIGN_LEAD: yup.boolean().equals([ true ]),
      STATUS_DESIGN_STUDENT: yup.boolean().equals([ true ]),
      STATUS_EVENT_LEAD: yup.boolean().equals([ true ]),
      STATUS_EVENT_STUDENT: yup.boolean().equals([ true ]),
      STATUS_MAKEUP_LEAD: yup.boolean().equals([ true ]),
      STATUS_MAKEUP_STUDENT: yup.boolean().equals([ true ]),
      STATUS_PET_LEAD: yup.boolean().equals([ true ]),
      STATUS_PET_STUDENT: yup.boolean().equals([ true ]),
      STATUS_WELLNESS_LEAD: yup.boolean().equals([ true ]),
      STATUS_WELLNESS_STUDENT: yup.boolean().equals([ true ]),
      STATUS_WRITING_LEAD: yup.boolean().equals([ true ]),
      STATUS_WRITING_STUDENT: yup.boolean().equals([ true ]),
    }).defined(),
    listIds: yup.array().of(yup.number().defined()),
    emailTemplateId: yup.number().integer().min(1),
  }),
});

const validatePostLeadRequest = async (o: unknown): Promise<ResultType<PostLeadRequest>> => {
  try {
    const request = await postLeadRequestSchema.validate(o);
    return Result.success(request);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'invalid request';
    return Result.fail(Error(message));
  }
};

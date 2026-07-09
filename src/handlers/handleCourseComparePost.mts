import type { RequestHandler } from 'express';
import { z } from 'zod';

import type { SchoolName } from '#src/domain/school.mjs';
import { schools } from '#src/domain/school.mjs';
import { createContact } from '#src/lib/activecampaign.mjs';
import { formatTelephoneNumber } from '#src/lib/formatTelephoneNumber.mjs';
import { storeLead } from '#src/lib/storeLead.mjs';

export const handleCourseComparePost: RequestHandler = async (req, res) => {
  const bodyResult = await bodySchema.safeParseAsync(req.body);

  if (!bodyResult.success) {
    res.status(400).send(bodyResult.error.message);
    return;
  }

  const body = bodyResult.data;

  const firstName = body.firstName.startsWith('-') ? null : body.firstName;
  const lastName = body.firstName.startsWith('-') ? null : body.lastName;

  const telephoneNumber = body.telephone ? formatTelephoneNumber(body.telephone.countryCode, body.telephone.number) : null;

  const result = await storeLead({
    ...body,
    ipAddress: null,
    firstName,
    lastName: lastName ?? null,
    school: body.school,
    city: null,
    provinceCode: null,
    countryCode: 'CA',
    telephoneNumber,
    emailOptIn: true,
    smsOptIn: true,
    referrer: null,
    gclid: null,
    msclkid: null,
    browserName: null,
    browserVersion: null,
    os: null,
    mobile: null,
    fbFields: null,
    userId: res.locals.user?.id,
  });
  if (!result.success) {
    console.error(result.error.message);
    res.sendStatus(500);
    return;
  }

  const automationIds = getAutomationIds(body.school, body.courseCode);

  if (automationIds) {
    await createContact(body.emailAddress, true, false, body.school, body.firstName, body.lastName, 'CA', null, null, telephoneNumber ?? undefined, automationIds);
  }

  res.status(201).send({ id: result.value });
};

interface Body {
  school: SchoolName;
  courseCode: string;
  emailAddress: string;
  firstName: string;
  lastName?: string;
  telephone?: { countryCode: number; number: string };
}

const bodySchema: z.ZodType<Body> = z.object({
  school: z.enum(schools),
  courseCode: z.string().trim().length(2),
  emailAddress: z.email().trim().min(1).max(255),
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100).optional(),
  telephone: z.object({
    countryCode: z.int().min(1).max(999),
    number: z.string().trim().min(1).max(32),
  }).optional(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAutomationIds = (schoolName: SchoolName, courseCode: string): bigint[] | undefined => {
  switch (schoolName) {
    case 'QC Event School':
      return [ 41n, 40n ];
    case 'QC Makeup Academy':
      return [ 43n, 44n ];
  }
};

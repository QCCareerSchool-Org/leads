import type { RequestHandler } from 'express';
import { z } from 'zod';

import type { SchoolName } from '#src/domain/school.mjs';
import { schools } from '#src/domain/school.mjs';
import type { BrevoAttributes } from '#src/lib/brevo.mjs';
import { sendBrevoEmail } from '#src/lib/brevo.mjs';
import { createBrevoContact } from '#src/lib/brevo.mjs';
import { formatTelephoneNumber } from '#src/lib/formatTelephoneNumber.mjs';
import { storeLead } from '#src/lib/storeLead.mjs';

export const handleCourseComparePost: RequestHandler = async (req, res) => {
  const bodyResult = await bodySchema.safeParseAsync(req.body);

  if (!bodyResult.success) {
    res.status(400).send(bodyResult.error.message);
    return;
  }

  const body = bodyResult.data;

  const telephoneNumber = body.telephone ? formatTelephoneNumber(body.telephone.countryCode, body.telephone.number) : null;

  const result = await storeLead({
    ...body,
    ipAddress: null,
    firstName: body.firstName,
    lastName: body.lastName ?? null,
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

  const details = getBrevoDetails(body.school, body.courseCode);

  if (details) {
    const createContactResult = await createBrevoContact(body.emailAddress, body.firstName, body.lastName ?? undefined, 'CA', null, null, details.attributes, details.listIds, telephoneNumber ?? undefined);
    if (createContactResult.success) {
      console.log('Created contact', createContactResult.value);
    } else {
      console.log('Could not create contact with telephone number', createContactResult.error.message);
      // make a second attempt without the telephone number
      if (telephoneNumber) {
        const createContactResult2 = await createBrevoContact(body.emailAddress, body.firstName, body.lastName ?? undefined, 'CA', null, null, details.attributes, details.listIds);
        if (createContactResult2.success) {
          console.log('Created contact', createContactResult2.value);
        } else {
          console.error('Could not create contact', createContactResult2.error.message);
        }
      }
    }

    if (details.emailTemplateId) {
      const sendEmailResult = await sendBrevoEmail(details.emailTemplateId, body.emailAddress, body.firstName);
      if (sendEmailResult.success) {
        console.log('Email sent', sendEmailResult.value);
      } else {
        console.error('Could not send email', sendEmailResult.error);
      }
    }
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

interface BrevoDetails {
  emailTemplateId?: number;
  listIds?: number[];
  attributes: BrevoAttributes;
}

const getBrevoDetails = (schoolName: SchoolName, courseCode: string): BrevoDetails | undefined => {
  const baseAttributes: BrevoAttributes = { SOURCE: 'Course Compare' };

  switch (schoolName) {
    case 'QC Design School':
      switch (courseCode) {
        case 'cc':
          return { emailTemplateId: 58, listIds: [ 18 ], attributes: { ...baseAttributes, STATUS_DESIGN_LEAD: true } };
        case 'fd':
          return { emailTemplateId: 1998, listIds: [ 12 ], attributes: { ...baseAttributes, STATUS_DESIGN_LEAD: true } };
        case 'fs':
          return { emailTemplateId: 2205, listIds: [ 64 ], attributes: { ...baseAttributes, STATUS_DESIGN_LEAD: true } };
        case 'po':
          return { emailTemplateId: 1939, listIds: [ 19 ], attributes: { ...baseAttributes, STATUS_DESIGN_LEAD: true } };
        case 'ld':
          return { emailTemplateId: 1967, listIds: [ 21 ], attributes: { ...baseAttributes, STATUS_DESIGN_LEAD: true } };
        case 'ms':
        case 'st':
          return { emailTemplateId: 1985, listIds: [ 20 ], attributes: { ...baseAttributes, STATUS_DESIGN_LEAD: true } };
        default:
          return { emailTemplateId: 1598, listIds: [ 18 ], attributes: { ...baseAttributes, STATUS_DESIGN_LEAD: true } };
      }
    case 'QC Event School':
      return { emailTemplateId: 3402, listIds: [ 115 ], attributes: { ...baseAttributes, STATUS_EVENT_LEAD: true } };
    case 'QC Makeup Academy':
      return { emailTemplateId: 3403, listIds: [ 114 ], attributes: { ...baseAttributes, STATUS_MAKEUP_LEAD: true } };
    case 'QC Pet Studies':
      switch (courseCode) {
        case 'dt':
          return { emailTemplateId: 1635, listIds: [ 30 ], attributes: { ...baseAttributes, STATUS_PET_LEAD: true } };
        default:
          return { emailTemplateId: 1660, listIds: [ 31 ], attributes: { ...baseAttributes, STATUS_PET_LEAD: true } };
      }
  }
};

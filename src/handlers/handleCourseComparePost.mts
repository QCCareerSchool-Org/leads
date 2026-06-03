import type { RequestHandler } from 'express';
import { z } from 'zod';

import type { SchoolSlug } from '#src/domain/school.mjs';
import { getSchoolName } from '#src/domain/school.mjs';
import type { BrevoAttributes } from '#src/lib/brevo.mjs';
import { sendBrevoEmail } from '#src/lib/brevo.mjs';
import { createBrevoContact } from '#src/lib/brevo.mjs';
import { parseFullName } from '#src/lib/parseFullName.js';
import { storeLead } from '#src/lib/storeLead.mjs';

export const handleCourseComparePost: RequestHandler<Params> = async (req, res) => {
  const [ paramsResult, bodyResult ] = await Promise.all([
    paramsSchema.safeParseAsync(req.params),
    bodySchema.safeParseAsync(req.body),
  ]);

  if (!paramsResult.success) {
    res.status(404).send(paramsResult.error.message);
    return;
  }

  if (!bodyResult.success) {
    res.status(400).send(bodyResult.error.message);
    return;
  }

  const params = paramsResult.data;
  const body = bodyResult.data;

  const school = getSchoolName(params.schoolSlug);
  const { firstName, lastName } = parseFullName(body.fullName);
  const telephoneNumber = body.telephone ? `+${body.telephone.countryCode} ${body.telephone.number}` : null;

  const result = await storeLead({
    ...body,
    firstName,
    lastName,
    school,
    provinceCode: body.provinceCode ?? null,
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
  });
  if (!result.success) {
    res.status(500).send(result.error.message);
    return;
  }

  const details = getBrevoDetails(params.schoolSlug, params.courseCode);

  if (details) {
    const createContactResult = await createBrevoContact(body.emailAddress, firstName, lastName ?? undefined, body.countryCode, body.provinceCode, body.city, details.attributes, details.listIds, telephoneNumber ?? undefined);
    if (createContactResult.success) {
      console.log('Created contact', createContactResult.value);
    } else {
      console.log('Could not create contact with telephone number', createContactResult.error.message);
      // make a second attempt without the telephone number
      if (telephoneNumber) {
        const createContactResult2 = await createBrevoContact(body.emailAddress, firstName, lastName ?? undefined, body.countryCode, body.provinceCode, body.city, details.attributes, details.listIds);
        if (createContactResult2.success) {
          console.log('Created contact', createContactResult2.value);
        } else {
          console.error('Could not create contact', createContactResult2.error.message);
        }
      }
    }

    if (details.emailTemplateId) {
      const sendEmailResult = await sendBrevoEmail(details.emailTemplateId, body.emailAddress, body.fullName);
      if (sendEmailResult.success) {
        console.log('Email sent', sendEmailResult.value);
      } else {
        console.error('Could not send email', sendEmailResult.error);
      }
    }
  }

  res.status(202).send({ id: result.value });
};

interface Params {
  schoolSlug: SchoolSlug;
  courseCode: string;
}

interface Body {
  ipAddress: string;
  emailAddress: string;
  fullName: string;
  telephone?: { countryCode: number; number: string };
  city: string;
  provinceCode?: string;
  countryCode: string;
}

const paramsSchema: z.ZodType<Params> = z.object({
  schoolSlug: z.string<SchoolSlug>(),
  courseCode: z.string().length(2),
});

const bodySchema: z.ZodType<Body> = z.object({
  ipAddress: z.union([ z.ipv4(), z.ipv6() ]),
  emailAddress: z.email(),
  fullName: z.string(),
  telephone: z.object({
    countryCode: z.int().min(1).max(999),
    number: z.string(),
  }).optional(),
  city: z.string(),
  provinceCode: z.string().optional(),
  countryCode: z.string().length(2),
});

interface BrevoDetails {
  emailTemplateId?: number;
  listIds?: number[];
  attributes: BrevoAttributes;
}

const getBrevoDetails = (schoolSlug: SchoolSlug, courseCode: string): BrevoDetails | undefined => {
  const baseAttributes: BrevoAttributes = { SOURCE: 'Course Compare' };

  switch (schoolSlug) {
    case 'design':
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
    case 'event':
      return { emailTemplateId: 32, listIds: [ 2 ], attributes: { ...baseAttributes, STATUS_EVENT_LEAD: true } };
    case 'makeup':
      return { emailTemplateId: 821, listIds: [ 9 ], attributes: { ...baseAttributes, STATUS_MAKEUP_LEAD: true } };
    case 'pet':
      switch (courseCode) {
        case 'dt':
          return { emailTemplateId: 1635, listIds: [ 30 ], attributes: { ...baseAttributes, STATUS_PET_LEAD: true } };
        default:
          return { emailTemplateId: 1660, listIds: [ 31 ], attributes: { ...baseAttributes, STATUS_PET_LEAD: true } };
      }
  }
};

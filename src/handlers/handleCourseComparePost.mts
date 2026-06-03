import type { RequestHandler } from 'express';
import { z } from 'zod';

import type { SchoolName } from '#src/domain/school.mjs';
import { storeLead } from '#src/lib/storeLead.mjs';

export const handleCourseComparePost: RequestHandler = async (req, res) => {
  const bodyResult = await schema.safeParseAsync(req.body);
  if (!bodyResult.success) {
    res.status(400).send(bodyResult.error.message);
    return;
  }

  const body = bodyResult.data;

  const result = await storeLead({
    ...body,
    lastName: body.lastName ?? null,
    provinceCode: body.provinceCode ?? null,
    telephoneNumber: body.telephone ? `+${body.telephone.countryCode} ${body.telephone.number}` : null,
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

  res.send(202).send({ id: result.value });
};

interface Body {
  ipAddress: string;
  school: SchoolName;
  emailAddress: string;
  firstName: string;
  lastName?: string;
  telephone?: { countryCode: number; number: string };
  emailOptIn: boolean;
  smsOptIn: boolean;
  city: string;
  provinceCode?: string;
  countryCode: string;
}

const schema: z.ZodType<Body> = z.object({
  ipAddress: z.union([ z.ipv4(), z.ipv6() ]),
  school: z.string<SchoolName>(),
  emailAddress: z.email(),
  firstName: z.string(),
  lastName: z.string().optional(),
  telephone: z.object({
    countryCode: z.int().min(1).max(999),
    number: z.string(),
  }).optional(),
  emailOptIn: z.boolean(),
  smsOptIn: z.boolean(),
  city: z.string(),
  provinceCode: z.string().optional(),
  countryCode: z.string().length(2),
});

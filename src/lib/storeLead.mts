import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import type { JsonValue } from '#src/domain/json.mjs';
import type { SchoolName } from '#src/domain/school.mjs';
import { parseIpAddress } from '#src/ipAddress.mjs';
import { logError, logWarning } from '#src/logger.mjs';
import { prismaGeneral } from '#src/prismaGeneral.mjs';
import { prismaLeads } from '#src/prismaLeads.mjs';
import { fixPrismaWriteDate, getDate } from './date.mjs';
import { binToUUID, createUUID, uuidToBin } from './uuid.mjs';

export interface LeadPayload {
  ipAddress: string | null;
  school: SchoolName;
  emailAddress: string;
  firstName: string | null;
  lastName: string | null;
  telephoneNumber: string | null;
  emailOptIn: boolean | null;
  smsOptIn: boolean | null;
  countryCode: string | null;
  provinceCode: string | null;
  city: string | null;
  referrer: string | null;
  gclid: string | null;
  msclkid: string | null;
  marketing?: {
    source: string | null;
    medium: string | null;
    campaign: string | null;
    content: string | null;
    term: string | null;
  };
  courses?: string[];
  browserName: string | null;
  browserVersion: string | null;
  os: string | null;
  mobile: boolean | null;
  nonce?: string;
  fbFields: JsonValue;
}

export const storeLead = async (leadPayload: LeadPayload): Promise<Result<string>> => {
  try {
    const prismaNow = fixPrismaWriteDate(getDate());
    const leadId = uuidToBin(createUUID());

    let countryCode = null;
    let provinceCode = null;

    // try to find the matching country and province
    if (leadPayload.provinceCode && leadPayload.countryCode) {
      // eslint-disable-next-line camelcase
      const provinceResult = await prismaGeneral.province.findUnique({ where: { countryCode_code: { countryCode: leadPayload.countryCode, code: leadPayload.provinceCode } } });
      if (provinceResult) {
        countryCode = provinceResult.countryCode;
        provinceCode = provinceResult.code;
      } else {
        logWarning(`province not found: ${leadPayload.provinceCode}/${leadPayload.countryCode}`);
      }
    }

    // we didn't find a province above so try to find just the country
    if (provinceCode === null && leadPayload.countryCode) {
      const countryResult = await prismaGeneral.country.findUnique({ where: { code: leadPayload.countryCode } });
      if (countryResult) {
        countryCode = countryResult.code;
      } else {
        logWarning(`country not found: ${leadPayload.countryCode}`);
      }
    }

    const lead = await prismaLeads.lead.create({
      data: {
        leadId,
        schoolName: leadPayload.school,
        emailAddress: leadPayload.emailAddress,
        ipAddress: leadPayload.ipAddress === null ? null : parseIpAddress(leadPayload.ipAddress),
        firstName: leadPayload.firstName,
        lastName: leadPayload.lastName,
        telephoneNumber: leadPayload.telephoneNumber,
        emailOptIn: leadPayload.emailOptIn ?? false,
        smsOptIn: leadPayload.smsOptIn ?? false,
        city: leadPayload.city,
        provinceCode,
        countryCode,
        referrer: leadPayload.referrer,
        browserName: leadPayload.browserName,
        browserVersion: leadPayload.browserVersion,
        os: leadPayload.os,
        mobile: leadPayload.mobile,
        gclid: leadPayload.gclid,
        msclkid: leadPayload.msclkid,
        created: prismaNow,
        courses: {
          create: leadPayload.courses?.map(c => ({ courseCode: c.toUpperCase() })) ?? [],
        },
        marketingParameterSet: typeof leadPayload.marketing === 'undefined' ? undefined : {
          create: {
            source: leadPayload.marketing.source,
            medium: leadPayload.marketing.medium,
            campaign: leadPayload.marketing.campaign,
            content: leadPayload.marketing.content,
            term: leadPayload.marketing.term,
          },
        },
        nonce: typeof leadPayload.nonce === 'undefined' ? null : uuidToBin(leadPayload.nonce),
        fbFields: leadPayload.fbFields ?? undefined,
      },
    });

    return success(binToUUID(lead.leadId));
  } catch (err) {
    logError('error inserting lead', err instanceof Error ? err.message : err);
    return failure(err instanceof Error ? err : Error('unknown error'));
  }
};

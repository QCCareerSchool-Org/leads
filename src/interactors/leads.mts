import type { ResultType } from 'generic-result-type';
import { Result } from 'generic-result-type';

import type { SchoolName } from '../domain/school.mjs';
import { parseIpAddress } from '../ipAddress.mjs';
import { fixPrismaWriteDate, getDate } from '../lib/date.mjs';
import { binToUUID, createUUID, uuidToBin } from '../lib/uuid.mjs';
import { logError, logWarning } from '../logger.mjs';
import { prismaGeneral } from '../prismaGeneral.mjs';
import { prismaLeads } from '../prismaLeads.mjs';

interface LeadPayload {
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
}

interface TelephoneNumberPayload {
  leadId: string;
  telephoneNumber: string;
}

export interface StoredLead {
  leadId: string;
}

export const getLeadByNonce = async (nonce: string): Promise<ResultType<StoredLead | false>> => {
  try {
    const nonceBin = uuidToBin(nonce);
    const lead = await prismaLeads.lead.findFirst({ where: { nonce: nonceBin } });
    if (lead) {
      return Result.success({
        leadId: binToUUID(lead.leadId),
      });
    }
    return Result.success(false);
  } catch (err) {
    logError('error checking nonce', err instanceof Error ? err.message : err);
    return Result.fail(err instanceof Error ? err : Error('unknown error'));
  }
};

export const storeLead = async (request: LeadPayload): Promise<ResultType<StoredLead>> => {
  try {
    const prismaNow = fixPrismaWriteDate(getDate());
    const leadId = uuidToBin(createUUID());

    let countryCode = null;
    let provinceCode = null;

    // try to find the matching country and province
    if (request.provinceCode && request.countryCode) {
      // eslint-disable-next-line camelcase
      const provinceResult = await prismaGeneral.province.findUnique({ where: { countryCode_code: { countryCode: request.countryCode, code: request.provinceCode } } });
      if (provinceResult) {
        countryCode = provinceResult.countryCode;
        provinceCode = provinceResult.code;
      } else {
        logWarning(`province not found: ${request.provinceCode}/${request.countryCode}`);
      }
    }

    // we didn't find a province above so try to find just the country
    if (provinceCode === null && request.countryCode) {
      const countryResult = await prismaGeneral.country.findUnique({ where: { code: request.countryCode } });
      if (countryResult) {
        countryCode = countryResult.code;
      } else {
        logWarning(`country not found: ${request.countryCode}`);
      }
    }

    const lead = await prismaLeads.lead.create({
      data: {
        leadId,
        schoolName: request.school,
        emailAddress: request.emailAddress,
        ipAddress: request.ipAddress === null ? null : parseIpAddress(request.ipAddress),
        firstName: request.firstName,
        lastName: request.lastName,
        telephoneNumber: request.telephoneNumber,
        emailOptIn: request.emailOptIn ?? false,
        smsOptIn: request.smsOptIn ?? false,
        city: request.city,
        provinceCode,
        countryCode,
        referrer: request.referrer,
        browserName: request.browserName,
        browserVersion: request.browserVersion,
        os: request.os,
        mobile: request.mobile,
        gclid: request.gclid,
        msclkid: request.msclkid,
        created: prismaNow,
        courses: {
          create: request.courses?.map(c => ({ courseCode: c.toUpperCase() })) ?? [],
        },
        marketingParameterSet: typeof request.marketing === 'undefined' ? undefined : {
          create: {
            source: request.marketing.source,
            medium: request.marketing.medium,
            campaign: request.marketing.campaign,
            content: request.marketing.content,
            term: request.marketing.term,
          },
        },
        nonce: typeof request.nonce === 'undefined' ? null : uuidToBin(request.nonce),
      },
    });

    return Result.success({
      leadId: binToUUID(lead.leadId),
    });
  } catch (err) {
    logError('error inserting lead', err instanceof Error ? err.message : err);
    return Result.fail(err instanceof Error ? err : Error('unknown error'));
  }
};

export const updateLeadTelephoneNumber = async (request: TelephoneNumberPayload): Promise<ResultType<string>> => {
  try {
    const leadIdBin = uuidToBin(request.leadId);
    const prismaNow = fixPrismaWriteDate(getDate());

    const lead = await prismaLeads.lead.update({
      data: {
        telephoneNumber: request.telephoneNumber,
        updated: prismaNow,
      },
      where: { leadId: leadIdBin },
    });

    return Result.success(lead.emailAddress);
  } catch (err) {
    logError('error inserting lead', err instanceof Error ? err.message : err);
    return Result.fail(err instanceof Error ? err : Error('unknown error'));
  }
};

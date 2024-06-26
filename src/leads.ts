import { fixPrismaWriteDate, getDate } from './date';
import { parseIpAddress } from './ipAddress';
import { logError, logWarning } from './logger';
import { prisma } from './prisma';
import { Result, ResultType } from './result';
import { SchoolName } from './school';
import { binToUUID, createUUID, uuidToBin } from './uuid';

export abstract class InsertLeadError extends Error { }

type InsertLeadRequest = {
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
  testGroup: number | null;
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
  city: string | null;
  browserName: string | null;
  browserVersion: string | null;
  os: string | null;
  mobile: boolean | null;
};

type InsertLeadResponse = {
  leadId: string;
};

export const insertLead = async (request: InsertLeadRequest): Promise<ResultType<InsertLeadResponse>> => {
  try {
    const prismaNow = fixPrismaWriteDate(getDate());
    const leadId = uuidToBin(createUUID());

    let countryCode = null;
    let provinceCode = null;

    // try to find the matching country and province
    if (request.provinceCode && request.countryCode) {
      // eslint-disable-next-line camelcase
      const provinceResult = await prisma.province.findUnique({ where: { countryCode_code: { countryCode: request.countryCode, code: request.provinceCode } } });
      if (provinceResult) {
        countryCode = provinceResult.countryCode;
        provinceCode = provinceResult.code;
      } else {
        logWarning(`province not found: ${request.provinceCode}/${request.countryCode}`);
      }
    }

    // we didn't find a province above so try to find just the country
    if (provinceCode === null && request.countryCode) {
      const countryResult = await prisma.country.findUnique({ where: { code: request.countryCode } });
      if (countryResult) {
        countryCode = countryResult.code;
      } else {
        logWarning(`country not found: ${request.countryCode}`);
      }
    }

    const lead = await prisma.lead.create({
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
        browserName: request.browserName,
        browserVersion: request.browserVersion,
        os: request.os,
        mobile: request.mobile,
        testGroup: request.testGroup,
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

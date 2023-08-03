import { fixPrismaWriteDate, getDate } from './date';
import { parseIpAddress } from './ipAddress';
import { logError } from './logger';
import { prisma } from './prisma';
import { Result, ResultType } from './result';
import { SchoolName } from './school';
import { createUUID, uuidToBin } from './uuid';

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
};

export const insertLead = async (request: InsertLeadRequest): Promise<ResultType<void>> => {
  try {
    const prismaNow = fixPrismaWriteDate(getDate());
    const leadId = uuidToBin(createUUID());

    await prisma.lead.create({
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
        countryCode: request.countryCode,
        provinceCode: request.provinceCode,
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

    return Result.success(undefined);
  } catch (err) {
    logError('error inserting lead', err instanceof Error ? err.message : err);
    return Result.fail(err instanceof Error ? err : Error('unknown error'));
  }
};

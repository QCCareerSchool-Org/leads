import type { Result } from 'generic-result-type';
import { fail, success } from 'generic-result-type';

import { fixPrismaWriteDate, getDate } from '../lib/date.mjs';
import { binToUUID, uuidToBin } from '../lib/uuid.mjs';
import { logError } from '../logger.mjs';
import { prismaLeads } from '../prismaLeads.mjs';

interface TelephoneNumberPayload {
  leadId: string;
  telephoneNumber: string;
}

export const getLeadByNonce = async (nonce: string): Promise<Result<string | false>> => {
  try {
    const nonceBin = uuidToBin(nonce);
    const lead = await prismaLeads.lead.findFirst({ where: { nonce: nonceBin } });
    if (lead) {
      return success(binToUUID(lead.leadId));
    }
    return success(false);
  } catch (err) {
    logError('error checking nonce', err instanceof Error ? err.message : err);
    return fail(err instanceof Error ? err : Error('unknown error'));
  }
};

export const updateLeadTelephoneNumber = async (request: TelephoneNumberPayload): Promise<Result<string>> => {
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

    return success(lead.emailAddress);
  } catch (err) {
    logError('error inserting lead', err instanceof Error ? err.message : err);
    return fail(err instanceof Error ? err : Error('unknown error'));
  }
};

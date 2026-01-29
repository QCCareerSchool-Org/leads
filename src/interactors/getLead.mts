import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import type { Lead } from '#src/domain/lead.mjs';
import { stringifyBuffer } from '#src/lib/ipAddress.mjs';
import { uuidToBin } from '#src/lib/uuid.mjs';
import { prismaLeads } from '#src/prismaLeads.mjs';

export const getLead = async (leadId: string): Promise<Result<Lead, GetLeadError>> => {
  let leadIdBin: Uint8Array<ArrayBuffer>;
  try {
    leadIdBin = uuidToBin(leadId);
  } catch (err) {
    const error = new GetLeadError('FormatError');
    if (err instanceof Error) {
      error.cause = error.message;
    }
    return failure(error);
  }

  const lead = await prismaLeads.lead.findFirst({ where: { leadId: leadIdBin } });
  if (!lead) {
    return failure(new GetLeadError('NotFound'));
  }

  return success({
    leadId,
    emailAddress: lead.emailAddress,
    telephoneNumber: lead.telephoneNumber,
    firstName: lead.firstName,
    lastName: lead.lastName,
    city: lead.city,
    provinceCode: lead.provinceCode,
    countryCode: lead.countryCode,
    ip: lead.ipAddress ? stringifyBuffer(lead.ipAddress) : null,
  });
};

export type GetLeadErrorMessage = 'FormatError' | 'NotFound';

class GetLeadError extends Error {
  public constructor(public readonly message: GetLeadErrorMessage) {
    super(message);
  }
}

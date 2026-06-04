import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';
import type { RowDataPacket } from 'mysql2';

import type { Lead } from '#src/domain/lead.mjs';
import { stringifyBuffer } from '#src/lib/ipAddress.mjs';
import { uuidToBin } from '#src/lib/uuid.mjs';
import { pool } from '#src/pool.mjs';

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

  const connection = await pool.getConnection();
  try {
    const [ rows ] = await connection.query<LeadRow[]>(sql, [ leadIdBin ]);
    const lead = rows[0];
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
      created: lead.created.getTime(),
    });

  } finally {
    connection.release();
  }
};

export interface LeadRow extends RowDataPacket {
  leadId: Buffer;
  emailAddress: string;
  telephoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  city: string | null;
  provinceCode: string | null;
  countryCode: string;
  ipAddress: Buffer | null;
  created: Date;
}

export type GetLeadErrorMessage = 'FormatError' | 'NotFound';

class GetLeadError extends Error {
  public constructor(public readonly message: GetLeadErrorMessage) {
    super(message);
  }
}

const sql = `
SELECT
  leadId,
  emailAddress,
  telephoneNumber,
  firstName,
  lastName,
  city,
  provinceCode,
  countryCode,
  ipAddress,
  created
FROM leads.leads
WHERE leadId = ?`;

import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';

import { pool } from '#src/pool.mjs';
import type { LeadRow } from './getLead.mjs';
import { binToUUID, uuidToBin } from '../lib/uuid.mjs';
import { logError } from '../logger.mjs';

interface TelephoneNumberPayload {
  leadId: string;
  telephoneNumber: string;
}

export const getLeadByNonce = async (nonce: string): Promise<Result<string | false>> => {
  const connection = await pool.getConnection();
  try {
    const nonceBin = uuidToBin(nonce);
    const [ rows ] = await connection.query<LeadRow[]>('SELECT * FROM leads.leads WHERE nonce = ? LIMIT 1', [ nonceBin ]);
    const lead = rows[0];
    if (lead) {
      return success(binToUUID(lead.leadId));
    }
    return success(false);
  } catch (err) {
    logError('error checking nonce', err instanceof Error ? err.message : err);
    return failure(err instanceof Error ? err : Error('unknown error'));
  } finally {
    connection.release();
  }
};

export const updateLeadTelephoneNumber = async (request: TelephoneNumberPayload): Promise<Result<string>> => {
  const connection = await pool.getConnection();
  try {
    const leadIdBin = uuidToBin(request.leadId);
    await connection.query('UPDATE leads.lead SET telephoneNumber = ? WHERE leadId = ?', [ leadIdBin, request.telephoneNumber ]);
    const [ rows ] = await connection.query<LeadRow[]>('SELECT emailAddress from leads.lead WHERE leadId = ?', [ leadIdBin ]);
    const lead = rows[0];
    if (!lead) {
      return failure(Error('Lead does not exist'));
    }
    return success(lead.emailAddress);
  } catch (err) {
    logError('error inserting lead', err instanceof Error ? err.message : err);
    return failure(err instanceof Error ? err : Error('unknown error'));
  } finally {
    connection.release();
  }
};

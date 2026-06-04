import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

import type { JsonValue } from '#src/domain/json.mjs';
import type { SchoolName } from '#src/domain/school.mjs';
import { parseIpAddress } from '#src/lib/ipAddress.mjs';
import { logError, logWarning } from '#src/logger.mjs';
import { pool } from '#src/pool.mjs';
import { createUUID, uuidToBin } from './uuid.mjs';

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
  userId?: number;
}

interface CountryRow extends RowDataPacket {
  code: string;
}

interface ProvinceRow extends RowDataPacket {
  country_code: string;
  code: string;
}

export const storeLead = async (leadPayload: LeadPayload): Promise<Result<string>> => {
  const connection = await pool.getConnection();
  try {
    const leadId = createUUID();
    const leadIdBin = uuidToBin(leadId);

    let countryCode = null;
    let provinceCode = null;

    // try to find the matching country and province
    if (leadPayload.provinceCode && leadPayload.countryCode) {
      const [ rows ] = await connection.query<ProvinceRow[]>('SELECT country_code, code FROM general.provinces WHERE country_code = ? AND code = ? LIMIT 1', [ leadPayload.countryCode, leadPayload.provinceCode ]);
      const province = rows[0];
      if (province) {
        countryCode = province.country_code;
        provinceCode = province.code;
      } else {
        logWarning(`province not found: ${leadPayload.provinceCode}/${leadPayload.countryCode}`);
      }
    }

    // we didn't find a province above so try to find just the country
    if (provinceCode === null && leadPayload.countryCode) {
      const [ rows ] = await connection.query<CountryRow[]>('SELECT code FROM general.countries WHERE code = ? LIMIT 1', [ leadPayload.countryCode ]);
      const country = rows[0];
      if (country) {
        countryCode = country.code;
      } else {
        logWarning(`country not found: ${leadPayload.countryCode}`);
      }
    }

    await connection.beginTransaction();
    try {
      await connection.query<ResultSetHeader>(insertLeadSql, [
        leadIdBin,
        leadPayload.school,
        leadPayload.emailAddress,
        leadPayload.ipAddress === null ? null : parseIpAddress(leadPayload.ipAddress),
        leadPayload.firstName,
        leadPayload.lastName,
        leadPayload.telephoneNumber,
        leadPayload.emailOptIn ?? false,
        leadPayload.smsOptIn ?? false,
        leadPayload.city,
        provinceCode,
        countryCode,
        leadPayload.referrer,
        leadPayload.browserName,
        leadPayload.browserVersion,
        leadPayload.os,
        leadPayload.mobile,
        leadPayload.gclid,
        leadPayload.msclkid,
        leadPayload.nonce,
        leadPayload.fbFields,
        leadPayload.userId,
      ]);

      if (leadPayload.courses) {
        await Promise.all(leadPayload.courses.map(async c => connection.query('INSERT INTO leads.leads_courses SET leadId = ?, courseCode = ?', [ leadIdBin, c.toUpperCase() ])));
      }

      if (leadPayload.marketing) {
        await connection.query(insertMarketingPayloadSql, [
          leadId,
          leadPayload.marketing.source,
          leadPayload.marketing.medium,
          leadPayload.marketing.campaign,
          leadPayload.marketing.content,
          leadPayload.marketing.term,
        ]);
      }

      await connection.commit();

      return success(leadId);
    } catch (err) {
      await connection.rollback();
      throw err;
    }
  } catch (err) {
    logError('error inserting lead', err instanceof Error ? err.message : err);
    return failure(err instanceof Error ? err : Error('unknown error'));
  } finally {
    connection.release();
  }
};

const insertLeadSql = `
INSERT INTO leads.leads
SET
  leadId = ?,
  schoolName = ?,
  emailAddress = ?,
  ipAddress = ?,
  firstName = ?,
  lastName = ?,
  telephoneNumber = ?,
  emailOptIn = ?,
  smsOptIn = ?,
  city = ?,
  provinceCode = ?,
  countryCode = ?,
  referrer = ?,
  browserName = ?,
  browserVersion = ?,
  os = ?,
  mobile = ?,
  gclid = ?,
  msclkid = ?,
  nonce = ?,
  fbFields = ?,
  userId = ?`;

const insertMarketingPayloadSql = `
INSERT INTO leads.marketing_parameter_sets
SET leadId = ?, source = ?, medium = ?, campaign = ?, content = ?, term = ?`;

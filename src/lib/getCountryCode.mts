import { getCache } from '@vercel/functions';
import type { RowDataPacket } from 'mysql2';

import { pool } from '#src/pool.mjs';

interface CountryRow extends RowDataPacket {
  code: string;
}

export const getCountryCode = async (countryName: string): Promise<string | null> => {
  const cache = getCache();
  const key = `countryName:${countryName}`;

  const cached = await cache.get(key);
  if (cached && typeof cached === 'string') {
    return cached;
  }

  const connection = await pool.getConnection();
  try {
    const [ rows ] = await connection.query<CountryRow[]>('SELECT code FROM general.countries WHERE name = ? LIMIT 1', [ countryName ]);
    const country = rows[0];
    if (country) {
      try {
        await cache.set(key, country.code);
      } catch (err) {
        console.warn(err);
      }

      return country.code;
    }
    return null;
  } finally {
    connection.release();
  }
};

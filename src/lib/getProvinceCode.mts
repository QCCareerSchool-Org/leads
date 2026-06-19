import { getCache } from '@vercel/functions';
import type { RowDataPacket } from 'mysql2';

import { pool } from '#src/pool.mjs';

interface ProvinceRow extends RowDataPacket {
  code: string;
}

export const getProvinceCode = async (countryCode: string, provinceName: string): Promise<string | null> => {
  const cache = getCache();
  const key = `provinceName:${countryCode}:${provinceName}`;

  const cached = await cache.get(key);
  if (cached && typeof cached === 'string') {
    return cached;
  }

  const connection = await pool.getConnection();
  try {
    const [ rows ] = await connection.query<ProvinceRow[]>('SELECT code FROM general.provinces WHERE country_code = ? AND name = ? LIMIT 1', [ countryCode, provinceName ]);
    const province = rows[0];
    if (province) {
      try {
        await cache.set(key, province.code);
      } catch (err) {
        console.warn(err);
      }

      return province.code;
    }
    return null;
  } finally {
    connection.release();
  }
};

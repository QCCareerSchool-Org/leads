import type { RequestHandler } from 'express';
import type { RowDataPacket } from 'mysql2';
import crypto from 'node:crypto';

import { inRange } from '#src/lib/inRange.mjs';
import { pool } from '#src/pool.mjs';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Locals {
      user?: {
        id: number;
        name: string;
      };
    }
  }
}

export const apiKeyMiddleware: RequestHandler = async (req, res, next) => {
  const start = performance.now();
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    res.sendStatus(401);
    return;
  }

  const match = /^Bearer\s+(.+)$/iu.exec(authorizationHeader);
  if (!match) {
    res.sendStatus(401);
    return;
  }

  const hashedKey = match[1] ? crypto.createHash('sha256').update(match[1]).digest() : null;

  const connection = await pool.getConnection();
  try {
    const [ userRows ] = await connection.query<UserRow[]>(selectUserSql, [ hashedKey ]);
    const user = userRows[0];
    if (!user) {
      res.sendStatus(401);
      return;
    }

    const [ whitelistRangeRows ] = await connection.query<WhitelistRangeRow[]>(selectWhitelistRangesSql, [ user.id ]);
    if (whitelistRangeRows.length) {
      if (!inRange(res.locals.ipAddress, whitelistRangeRows)) {
        res.sendStatus(401);
        return;
      }
    }

    res.locals.user = {
      id: user.id,
      name: user.name,
    };

  } finally {
    connection.release();
  }

  const end = performance.now();
  console.log('apiKeyMiddleware', end - start);
  next();
};

const selectUserSql = `
SELECT u.id, u.name
FROM leads.users u
JOIN leads.api_keys a ON u.id = a.userId
WHERE a.hashedKey = ? AND u.enabled <> 0
LIMIT 1`;

const selectWhitelistRangesSql = `
SELECT id, userId, ipAddress, prefixLength
FROM leads.whitelist_ranges
WHERE userId = ?`;

interface UserRow extends RowDataPacket {
  id: number;
  name: string;
}

interface WhitelistRangeRow extends RowDataPacket {
  id: number;
  userId: number;
  ipAddress: Buffer;
  prefixLength: number;
}

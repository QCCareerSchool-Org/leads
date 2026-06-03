import type { RequestHandler } from 'express';
import crypto from 'node:crypto';

import { inRange } from '#src/lib/inRange.mjs';
import { prismaLeads } from '#src/prismaLeads.mjs';

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

  const hashedKey = crypto.createHash('sha256').update(match[1]).digest();

  const apiKey = await prismaLeads.apiKey.findUnique({
    where: { hashedKey, user: { enabled: true } },
    include: { user: { include: { whitelistRanges: true } } },
  });
  if (!apiKey) {
    res.sendStatus(401);
    return;
  }

  if (apiKey.user.whitelistRanges.length) {
    if (!inRange(res.locals.ipAddress, apiKey.user.whitelistRanges)) {
      res.sendStatus(401);
      return;
    }
  }

  res.locals.user = {
    id: apiKey.userId,
    name: apiKey.user.name,
  };

  next();
};

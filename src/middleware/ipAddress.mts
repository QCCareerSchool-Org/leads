import type { RequestHandler } from 'express';

import { firstCommaSeparatedValue } from '#src/lib/firstCommaSeparatedValue.mjs';
import { firstHeaderValue } from '#src/lib/firstHeaderValue.mjs';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Locals {
      ipAddress: string | null;
    }
  }
}

/**
 * Get the client IP address and stores it in res.locals
 */
export const ipAddressMiddleware: RequestHandler = (req, res, next) => {
  // Vercel overwrites x-forwarded-for, so this is trusted for direct-to-Vercel traffic
  const forwardedFor = firstHeaderValue(req.headers['x-forwarded-for']);

  res.locals.ipAddress = firstCommaSeparatedValue(forwardedFor)
    ?? req.socket.remoteAddress
    ?? null;

  next();
};

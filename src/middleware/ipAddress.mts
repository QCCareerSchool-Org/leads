import type { RequestHandler } from 'express';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Locals {
      ipAddress: string | null;
    }
  }
}

export const ipAddressMiddleware: RequestHandler = (req, res, next) => {
  let ipAddress: string | null = null;

  const forwardedForRaw = req.headers['x-forwarded-for'];

  if (Array.isArray(forwardedForRaw)) {
    const forwardedFor = forwardedForRaw[0];
    if (typeof forwardedFor !== 'undefined') {
      const split = forwardedFor.split(',');
      const first = split[0];
      if (typeof first !== 'undefined') {
        ipAddress = first.trim();
      }
    }
  } else if (typeof forwardedForRaw === 'string') {
    const split = forwardedForRaw.split(',');
    const first = split[0];
    if (typeof first !== 'undefined') {
      ipAddress = first.trim();
    }
  } else if (req.socket.remoteAddress) {
    ipAddress = req.socket.remoteAddress;
  }

  res.locals.ipAddress = ipAddress;
  next();
};

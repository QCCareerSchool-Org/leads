import dotenv from 'dotenv';
import type { RequestHandler } from 'express';

dotenv.config();

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
  // if (process.env.NODE_ENV !== 'production') {
  //   ipAddress = '135.23.119.183';
  // } else {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (Array.isArray(forwardedFor) && forwardedFor.length) {
    ipAddress = forwardedFor[0].split(',')[0].trim();
  } else if (typeof forwardedFor === 'string') {
    ipAddress = forwardedFor.split(',')[0].trim();
  } else if (req.socket.remoteAddress) {
    ipAddress = req.socket.remoteAddress;
  }
  // }
  res.locals.ipAddress = ipAddress;
  next();
};

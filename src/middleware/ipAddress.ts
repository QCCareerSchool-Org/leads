import dotenv from 'dotenv';
import type { RequestHandler } from 'express';

dotenv.config();

export const ipAddressMiddleware: RequestHandler = (req, res, next) => {
  let ipAddress: string | null = null;
  if (process.env.MODE !== 'production') {
    ipAddress = '135.23.119.183';
  } else {
    const forwardedFor = req.headers['x-forwarded-for'];
    if (Array.isArray(forwardedFor) && forwardedFor.length) {
      ipAddress = forwardedFor[0].split(',')[0].trim();
    } else if (typeof forwardedFor === 'string') {
      ipAddress = forwardedFor.split(',')[0].trim();
    } else if (req.socket.remoteAddress) {
      ipAddress = req.socket.remoteAddress;
    }
  }
  res.locals.ipAddress = ipAddress;
  next();
};

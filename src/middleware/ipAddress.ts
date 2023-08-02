import dotenv from 'dotenv';
import type { RequestHandler } from 'express';

dotenv.config();

export const ipAddressMiddleware: RequestHandler = (req, res, next) => {
  let ipAddress: string | null = null;
  const forwardedFor = req.headers['x-forwarded-for'];
  if (Array.isArray(forwardedFor) && forwardedFor.length) {
    ipAddress = forwardedFor[0].split(',')[0].trim();
  } else if (typeof forwardedFor === 'string') {
    ipAddress = forwardedFor.split(',')[0].trim();
  } else if (req.socket.remoteAddress) {
    ipAddress = req.socket.remoteAddress;
  }
  if (process.env.MODE === 'test') {
    ipAddress = '135.23.119.183';
  }
  res.locals.location = ipAddress;
  next();
};

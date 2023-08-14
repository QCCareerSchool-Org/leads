import dotenv from 'dotenv';
import type { RequestHandler } from 'express';
import maxmind, { CityResponse } from 'maxmind';

import { logError } from '../logger';

dotenv.config();

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Locals {
      geoLocation?: CityResponse | null;
    }
  }
}

if (typeof process.env.MMDB_LOCATION === 'undefined') {
  throw Error('MMDB_LOCATION environment variable is missing');
}

const cityReaderPromise = maxmind.open<CityResponse>(process.env.MMDB_LOCATION);

export const geoLocationMiddleware: RequestHandler = (req, res, next) => {
  if (!res.locals.ipAddress) {
    next();
    return;
  }
  cityReaderPromise.then(reader => {
    if (!res.locals.ipAddress) {
      throw Error('ip address is missing');
    }
    res.locals.geoLocation = reader.get(res.locals.ipAddress);
    next();
  }).catch(err => {
    logError('Error determining geo location', err);
  });
};

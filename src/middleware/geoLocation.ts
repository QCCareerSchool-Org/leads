import dotenv from 'dotenv';
import type { RequestHandler } from 'express';
import maxmind, { CityResponse } from 'maxmind';

import { logError } from '../logger';

dotenv.config();

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Locals {
      geoLocation?: {
        countryCode?: string;
        provinceCode?: string | null;
        city?: string;
        latitude?: number;
        longitude?: number;
      };
    }
  }
}

if (typeof process.env.MMDB_LOCATION === 'undefined') {
  throw Error('MMDB_LOCATION environment variable is missing');
}

const cityReaderPromise = maxmind.open<CityResponse>(process.env.MMDB_LOCATION);

export const geoLocationMiddleware: RequestHandler = (req, res, next) => {
  const ipAddress = res.locals.ipAddress;

  if (!ipAddress) {
    return next();
  }

  cityReaderPromise.then(reader => {
    const cityResponse = reader.get(ipAddress);
    if (cityResponse) {
      const countryCode = cityResponse.country?.iso_code;
      res.locals.geoLocation = {
        countryCode: countryCode,
        provinceCode: needsProvinceCode(countryCode) ? cityResponse.subdivisions?.[0].iso_code : null,
        city: cityResponse.city?.names.en,
        latitude: cityResponse.location?.latitude,
        longitude: cityResponse.location?.latitude,
      };
    }
    next();
  }).catch(err => {
    logError('Error determining geo location', err);
  });
};

const needsProvinceCode = (countryCode?: string): boolean => {
  return countryCode === 'CA' || countryCode === 'US' || countryCode === 'AU';
};

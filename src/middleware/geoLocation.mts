import type { RequestHandler } from 'express';

interface GeoLocation {
  countryCode: string;
  provinceCode: string | null;
  city: string | null;
  latitude?: number;
  longitude?: number;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Locals {
      geoLocation?: GeoLocation;
    }
  }
}

export const geoLocationMiddleware: RequestHandler = (req, res, next) => {
  const getHeader = (headerName: string): string | null => {
    const rawHeader = req.headers[headerName];
    if (Array.isArray(rawHeader)) {
      return rawHeader[0] ?? null;
    }
    return rawHeader ?? null;
  };

  const countryCode = getHeader('x-vercel-ip-country') ?? 'US';
  const provinceCode = needsProvinceCode(countryCode)
    ? getHeader('x-vercel-ip-country-region')
    : null;
  const city = getHeader('x-vercel-ip-city');
  const rawLatitude = getHeader('x-vercel-ip-latitude');
  const rawLongitude = getHeader('x-vercel-ip-longitude');

  const latitude = rawLatitude ? parseFloat(rawLatitude) : null;
  const longitude = rawLongitude ? parseFloat(rawLongitude) : null;

  const geoLocation: GeoLocation = {
    countryCode,
    provinceCode,
    city,
    latitude: latitude && !isNaN(latitude) ? latitude : undefined,
    longitude: longitude && !isNaN(longitude) ? longitude : undefined,
  };

  res.locals.geoLocation = geoLocation;

  next();
};

const needsProvinceCode = (countryCode?: string): boolean => {
  return countryCode === 'CA' || countryCode === 'US' || countryCode === 'AU';
};

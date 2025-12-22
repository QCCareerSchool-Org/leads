import { invalidCountry } from './invalidCountry.js';
import { isGibberish } from './isGibberish.js';

type Result =
  | { result: false }
  | { result: true; message: string };

export const isBot = (body: Record<string, string | undefined>, countryCode: string): Result => {
  for (const key in body) {
    if (!Object.hasOwn(body, key)) {
      continue;
    }
    if (key.startsWith('hp_')) {
      if (body[key]) {
        return { result: true, message: 'Honeypot field filled' };
      }
    }
  }

  // email address same as first or last name
  if (body.emailAddress && (body.emailAddress === body.firstName || body.emailAddress === body.lastName)) {
    return { result: true, message: 'Name equals email' };
  }
  // first name and last name are similar
  if (typeof body.firstName !== 'undefined' && typeof body.lastName !== 'undefined' && body.firstName.length >= 8 && body.lastName.startsWith(body.firstName.substring(0, 9))) {
    return { result: true, message: 'First and last name match' };
  }
  if (invalidCountry(countryCode)) {
    return { result: true, message: 'Invalid country' };
  }
  if (body.firstName) {
    // too short
    if (body.firstName.length <= 1) {
      return { result: true, message: 'First name too short' };
    }
    if (isGibberish(body.firstName)) {
      return { result: true, message: 'First name is gibberish' };
    }
  }
  if (body.lastName) {
    // too short
    if (body.lastName.length <= 1) {
      return { result: true, message: 'Last name is too short' };
    }
    if (isGibberish(body.lastName)) {
      return { result: true, message: 'Last name is gibberish' };
    }
  }

  return { result: false };
};

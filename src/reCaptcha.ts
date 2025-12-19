import type { ResultType } from './result.js';
import { Result } from './result.js';

type ErrorCode =
  | 'missing-input-secret' // The secret parameter is missing.
  | 'invalid-input-secret' // The secret parameter is invalid or malformed.
  | 'missing-input-response' // The response parameter is missing.
  | 'invalid-input-response' // The response parameter is invalid or malformed.
  | 'bad-request' //  The request is invalid or malformed.
  | 'timeout-or-duplicate' // The response is no longer valid: either is too old or has been used previously.
  | 'browser-error';

interface ReCaptchaResponse {
  'success': boolean;
  /** string date */
  'challenge_ts': string;
  /** the hostname of the site where the reCAPTCHA was solved */
  'hostname': string;
  'error-codes'?: ErrorCode[];
}

const url = 'https://www.google.com/recaptcha/api/siteverify';

const secretKey = process.env.RECAPTCHA_SECRET_KEY ?? '';

const isReCaptchaResponse = (obj: unknown): obj is ReCaptchaResponse => {
  return typeof obj === 'object' && obj !== null &&
    'success' in obj && typeof obj.success === 'boolean' &&
    (!('challenge_ts' in obj) || ('challenge_ts' in obj && typeof obj.challenge_ts === 'string')) &&
    (!('hostname' in obj) || ('hostname' in obj && typeof obj.hostname === 'string'));
};

export const validateCaptcha = async (token: string, remoteIp?: string | null): Promise<ResultType<ReCaptchaResponse>> => {
  try {
    const urlSearchParams = new URLSearchParams({
      secret: secretKey,
      response: token,
    });
    if (remoteIp) {
      urlSearchParams.append('remoteIp', remoteIp);
    }
    const response = await fetch(url, {
      method: 'post',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: urlSearchParams,
    });
    if (!response.ok) {
      return Result.fail(Error('reCaptcha http request error'));
    }
    const validationResult: unknown = await response.json();
    if (!isReCaptchaResponse(validationResult)) {
      return Result.fail(Error('Invalid reCaptcha response body'));
    }
    return Result.success(validationResult);
  } catch (cause: unknown) {
    const err = Error('Unknown reCaptcha error');
    err.cause = cause;
    return Result.fail(err);
  }
};

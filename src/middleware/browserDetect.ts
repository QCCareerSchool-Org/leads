import browser from 'browser-detect';
import type { RequestHandler } from 'express';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Locals {
      browser?: ReturnType<typeof browser>;
    }
  }
}

/**
 * Middleware that determines the browser and OS and stores the data in res.locals.browser
 *
 * @param req express request
 * @param res express response
 * @param next express next function
 */
export const browserDetectMiddleware: RequestHandler = (req, res, next) => {
  res.locals.browser = browser(req.headers['user-agent']);
  next();
};

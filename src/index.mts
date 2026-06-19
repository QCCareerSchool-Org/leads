import 'dotenv/config';

import compression from 'compression';
import type { CorsOptions } from 'cors';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { fbRouter } from './fbRouter.mjs';
import { globalErrorHandler } from './handlers/globalErrorHandler.mjs';
import { handleCourseComparePost } from './handlers/handleCourseComparePost.mjs';
import { handleLeadGet } from './handlers/handleLeadGet.mjs';
import { handleLeadsPost } from './handlers/handleLeadsPost.mjs';
import { handleTelephoneNumberPost } from './handlers/handleTelephoneNumberPost.mjs';
import { getMethodNotAllowedHandler } from './handlers/methodNotAllowedHandler.mjs';
import { apiKeyMiddleware } from './middleware/apiKey.mjs';
import { browserDetectMiddleware } from './middleware/browserDetect.mjs';
import { geoLocationMiddleware } from './middleware/geoLocation.mjs';
import { ipAddressMiddleware } from './middleware/ipAddress.mjs';
import { rateLimitMiddleware } from './middleware/rateLimit.mjs';

const corsOptions: CorsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? [
      /\.qccareerschool\.com$/u,
      /\.qcdesignschool\.com$/u,
      /\.qceventplanning\.com$/u,
      /\.qcmakeupacademy\.com$/u,
      /\.qcpetstudies\.com$/u,
      /\.qcwellnessstudies\.com$/u,
      /\.winghill\.com$/u,
      /\.pawparentacademy\.com$/u,
      /\.?localhost(?::\d{1,5})?$/u,
    ]
    : '*',
  allowedHeaders: [ 'content-type', 'authorization' ],
};

declare module 'node:http' {
  interface IncomingMessage {
    rawBody?: Buffer;
  }
}

const app = express();

app.set('trust proxy', 1);
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));
app.use(express.urlencoded({ extended: false }));

app.use(rateLimitMiddleware);
app.use(ipAddressMiddleware);
app.use(geoLocationMiddleware);
app.use(browserDetectMiddleware);

app.route('/')
  .post(handleLeadsPost)
  .all(getMethodNotAllowedHandler([ 'POST' ]));

app.route('/leads/:leadId')
  .get(handleLeadGet)
  .all(getMethodNotAllowedHandler([ 'GET' ]));

app.route('/telephoneNumber')
  .post(handleTelephoneNumberPost)
  .all(getMethodNotAllowedHandler([ 'POST' ]));

app.use('/fb', fbRouter);

app.route('/course-compare')
  .post(apiKeyMiddleware, handleCourseComparePost)
  .all(getMethodNotAllowedHandler([ 'POST' ]));

app.route('/proxy-hops')
  .get((req, res) => { res.send(req.ip); })
  .all(getMethodNotAllowedHandler([ 'GET' ]));

app.use(globalErrorHandler);

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT ?? 8080;
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}

export default app;

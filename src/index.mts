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
import { apiKeyMiddleware } from './middleware/apiKey.mjs';
import { browserDetectMiddleware } from './middleware/browserDetect.mjs';
import { geoLocationMiddleware } from './middleware/geoLocation.mjs';
import { ipAddressMiddleware } from './middleware/ipAddress.mjs';

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

app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf; } }));
app.use(express.urlencoded({ extended: false }));

app.use(ipAddressMiddleware);
app.use(geoLocationMiddleware);
app.use(browserDetectMiddleware);

app.post('/', handleLeadsPost);
app.get('/leads/:leadId', handleLeadGet);
app.post('/telephoneNumber', handleTelephoneNumberPost);
app.use('/fb', fbRouter);

// everything requires api key from here one
app.use(apiKeyMiddleware);
app.post('/course-compare/:schoolSlug/:courseCode', handleCourseComparePost);

app.use(globalErrorHandler);

if (process.env.NODE_ENV !== 'production') {
  app.listen(8080);
}

export default app;

import 'dotenv/config';

import compression from 'compression';
import type { CorsOptions } from 'cors';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import config from './config.mjs';
import { fbRouter } from './fbRouter.mjs';
import { globalErrorHandler } from './handlers/globalErrorHandler.mjs';
import { handleLeadsPost } from './handlers/handleLeadsPost.mjs';
import { handleTelephoneNumberPost } from './handlers/handleTelephoneNumberPost.mjs';
import { logInfo } from './logger.mjs';
import { browserDetectMiddleware } from './middleware/browserDetect.mjs';
import { geoLocationMiddleware } from './middleware/geoLocation.mjs';
import { ipAddressMiddleware } from './middleware/ipAddress.mjs';
import { logRequest } from './middleware/logRequest.mjs';

const corsOptions: CorsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? [
      /\.qccareerschool\.com$/iu,
      /\.qcmakeupacademy\.com$/iu,
      /\.qcdesignschool\.com$/iu,
      /\.qceventplanning\.com$/iu,
      /\.qcpetstudies\.com$/iu,
      /\.qcwellnessstudies\.com$/iu,
      /\.winghill\.com$/iu,
    ]
    : '*',
  allowedHeaders: [ 'content-type' ],
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
app.use(express.json({
  verify: (req, res, buf) => { req.rawBody = buf; },
}));
app.use(express.urlencoded({ extended: false }));

app.use(ipAddressMiddleware);
app.use(geoLocationMiddleware);
app.use(browserDetectMiddleware);

app.use(logRequest);

app.post('/', handleLeadsPost);
app.post('/telephoneNumber', handleTelephoneNumberPost);
app.use('/fb', fbRouter);

app.use(globalErrorHandler);

app.listen(config.port, () => {
  logInfo(`starting server on port ${config.port}`);
});

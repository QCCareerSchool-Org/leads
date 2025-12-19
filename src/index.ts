import compression from 'compression';
import type { CorsOptions } from 'cors';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { asyncWrapper } from './asyncWrapper.js';
import config from './config.js';
import { globalErrorHandler } from './globalErrorHandler.js';
import { handleLeadsPost } from './handleLeadsPost.js';
import { handleTelephoneNumberPost } from './handleTelephoneNumberPost.js';
import { logInfo } from './logger.js';
import { browserDetectMiddleware } from './middleware/browserDetect.js';
import { geoLocationMiddleware } from './middleware/geoLocation.js';
import { ipAddressMiddleware } from './middleware/ipAddress.js';

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

const app = express();
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(ipAddressMiddleware);
app.use(geoLocationMiddleware);
app.use(browserDetectMiddleware);

app.post('/', asyncWrapper(handleLeadsPost));
app.post('/telephoneNumber', asyncWrapper(handleTelephoneNumberPost));
app.use(globalErrorHandler);

app.listen(config.port, () => {
  logInfo(`starting server on port ${config.port}`);
});

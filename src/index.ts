import compression from 'compression';
import cors, { CorsOptions } from 'cors';
import express from 'express';
import helmet from 'helmet';

import { asyncWrapper } from './asyncWrapper';
import config from './config';
import { globalErrorHandler } from './globalErrorHandler';
import { handleLeadsPost } from './handleLeadsPost';
import { handleTelephoneNumberPost } from './handleTelephoneNumberPost';
import { logInfo } from './logger';
import { browserDetectMiddleware } from './middleware/browserDetect';
import { geoLocationMiddleware } from './middleware/geoLocation';
import { ipAddressMiddleware } from './middleware/ipAddress';

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

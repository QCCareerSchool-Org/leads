import { Router } from 'express';

import { handleFacebookEvent } from './handlers/handleFacebookEvent.mjs';
import { handleFacebookVerification } from './handlers/handleFacebookVerification/index.mjs';
import { asyncWrapper } from './lib/asyncWrapper.mjs';
import { verifyFBSignature } from './middleware/verifyFBSignature.mjs';

export const fbRouter = Router();

fbRouter.use(verifyFBSignature);
fbRouter.get('/forms/:schoolSlug', handleFacebookVerification);
fbRouter.post('/forms/:schoolSlug', asyncWrapper(handleFacebookEvent));

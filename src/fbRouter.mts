import { Router } from 'express';

import { handlePayload } from './handlers/facebook/handlePayload/index.mjs';
import { handleVerification } from './handlers/facebook/handleVerification/index.mjs';
import { asyncWrapper } from './lib/asyncWrapper.mjs';
import { verifyFBSignature } from './middleware/verifyFBSignature.mjs';

export const fbRouter = Router();

fbRouter.use(verifyFBSignature);
fbRouter.get('/forms/:schoolSlug', handleVerification);
fbRouter.post('/forms/:schoolSlug', asyncWrapper(handlePayload));

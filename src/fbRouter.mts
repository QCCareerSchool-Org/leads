import { Router } from 'express';

import { handlePayload } from './handlers/facebook/handlePayload/index.mjs';
import { handlePayload as oldHandlePayload } from './handlers/facebook/handlePayload/index.old.mjs';
import { handleVerification } from './handlers/facebook/handleVerification/index.mjs';
import { verifyFBSignature } from './middleware/verifyFBSignature.mjs';

export const fbRouter = Router();

fbRouter.use(verifyFBSignature);
fbRouter.get('/forms/:schoolSlug', handleVerification);
fbRouter.post('/forms/:schoolSlug', oldHandlePayload);
fbRouter.get('/forms', handleVerification);
fbRouter.post('/forms', handlePayload);

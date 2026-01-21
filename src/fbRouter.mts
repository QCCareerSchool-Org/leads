import { Router } from 'express';

import { handlePage } from './handlers/facebook/handlePage/index.mjs';
import { handleVerification } from './handlers/facebook/handleVerification/index.mjs';
import { verifyFBSignature } from './middleware/verifyFBSignature.mjs';

export const fbRouter = Router();

fbRouter.use(verifyFBSignature);
fbRouter.get('/pages', handleVerification);
fbRouter.post('/pages', handlePage);

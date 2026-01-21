import type { Request, Response } from 'express';

import { handleTelephoneNumberPostJSON } from './handleTelephoneNumberPostJSON.mjs';

export const handleTelephoneNumberPost = async (req: Request, res: Response): Promise<void> => {
  if (req.headers['content-type']?.toLowerCase().startsWith('application/json')) {
    return handleTelephoneNumberPostJSON(req, res);
  }
  res.sendStatus(415);
};

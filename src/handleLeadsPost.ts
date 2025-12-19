import type { Request, Response } from 'express';

import { handleLeadsPostForm } from './handleLeadsPostForm.js';
import { handleLeadsPostJSON } from './handleLeadsPostJSON.js';

export const handleLeadsPost = async (req: Request, res: Response): Promise<void> => {
  if (req.headers['content-type']?.toLowerCase().startsWith('application/json')) {
    return handleLeadsPostJSON(req, res);
  }
  return handleLeadsPostForm(req, res);
};

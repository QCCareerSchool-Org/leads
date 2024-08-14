import type { Request, Response } from 'express';

import { handleLeadsPostForm } from './handleLeadsPostForm';
import { handleLeadsPostJSON } from './handleLeadsPostJSON';

export const handleLeadsPost = async (req: Request, res: Response): Promise<void> => {
  if (req.headers['content-type']?.toLowerCase().startsWith('application/json')) {
    return handleLeadsPostJSON(req, res);
  }
  return handleLeadsPostForm(req, res);
};

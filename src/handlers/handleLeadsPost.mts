import type { Request, Response } from 'express';

import { handleLeadsPostForm } from './handleLeadsPostForm.mjs';
import { handleLeadsPostJSON } from './handleLeadsPostJSON.mjs';

export const handleLeadsPost = async (req: Request, res: Response): Promise<void> => {
  if (req.method.toLowerCase() !== 'post') {
    res.sendStatus(405);
  }

  const contentType = req.headers['content-type']?.toLowerCase().split(';', 1)[0]?.trim();

  if (contentType && contentType === 'application/json') {
    return handleLeadsPostJSON(req, res);
  }

  return handleLeadsPostForm(req, res);
};

import type { Request, Response } from 'express';

export const handleLeadsPostJSON = async (req: Request, res: Response): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 8_000)); // delay for spammers
  res.status(400).end();
};

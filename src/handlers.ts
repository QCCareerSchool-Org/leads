import { Request, Response } from 'express';

import { validateInsertLeadRequest } from './dto/insertLeadRequest';
import { insertLead } from './leads';

export const handleLeadPost = async (req: Request, res: Response): Promise<void> => {
  const validated = await validateInsertLeadRequest(req.body);

  if (!validated.success) {
    res.status(400).send({ message: validated.error.message });
    return;
  }

  const request = validated.value;
  const response = await insertLead({
    ipAddress: res.locals.ipAddress ?? null,
    ...request,
  });

  if (response.success) {
    res.end();
  } else {
    switch (response.error.constructor) {
      default:
        res.status(500).send(response.error.message);
    }
  }
};

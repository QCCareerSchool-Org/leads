import type { Request, Response } from 'express';
import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';
import { z } from 'zod';

import { updateLeadTelephoneNumber } from '../interactors/leads.mjs';
import { createBrevoContact } from '../lib/brevo.mjs';
import { createPayload } from '../lib/createPayload.mjs';

export const handleTelephoneNumberPut = async (req: Request, res: Response): Promise<void> => {
  if (req.method.toLowerCase() !== 'put') {
    res.sendStatus(405);
  }

  if (req.headers['content-type'] && req.headers['content-type'].toLowerCase().split(';', 1)[0]?.trim() !== 'application/json') {
    res.sendStatus(415);
    return;
  }

  const validationResult = await validate(req);

  if (!validationResult.success) {
    console.error('Validation error', validationResult.error, createPayload(req, res));
    res.status(400).send(validationResult.error.message);
    return;
  }

  const { params, body } = validationResult.value;

  const telephoneNumber = /^\d{10}$/u.test(body.telephoneNumber)
    ? '+1' + body.telephoneNumber
    : body.telephoneNumber;

  const updateResult = await updateLeadTelephoneNumber({ leadId: params.leadId, telephoneNumber });

  if (updateResult.success) {
    const updateContactResult = await createBrevoContact(updateResult.value, undefined, undefined, undefined, undefined, undefined, undefined, [ body.listId ], body.telephoneNumber);
    if (!updateContactResult.success) {
      console.error('Could not update Brevo contact', updateContactResult.error, createPayload(req, res));
    }
  }

  if (updateResult.success) {
    res.sendStatus(200);
  } else {
    console.error('Unable to update lead', updateResult.error.message, createPayload(req, res));
    switch (updateResult.error.constructor) {
      default:
        res.status(500).send(updateResult.error.message);
    }
  }
};

const bodySchema: z.ZodType<PutRequest['body']> = z.object({
  telephoneNumber: z.string(),
  listId: z.number().int().positive(),
});

const paramsSchema: z.ZodType<PutRequest['params']> = z.object({
  leadId: z.uuid(),
});

const validate = async (request: Request): Promise<Result<PutRequest>> => {
  try {
    const [ params, body ] = await Promise.all([
      paramsSchema.parseAsync(request.params),
      bodySchema.parseAsync(request.body),
    ]);
    return success({ params, body });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'invalid request';
    return failure(Error(message));
  }
};

export interface PutRequest {
  params: {
    /** UUID string */
    leadId: string;
  };
  body: {
    telephoneNumber: string;
    listId: number;
  };
}

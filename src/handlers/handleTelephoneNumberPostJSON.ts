import type { Request, Response } from 'express';
import { z } from 'zod';

import { createBrevoContact } from '../lib/brevo.js';
import { createPayload } from '../lib/createPayload.js';
import type { PostTelephoneNumberRequest } from '../domain/postTelephoneNumberRequest.js';
import { updateLeadTelephoneNumber } from '../interactors/leads.js';
import { logError } from '../logger.js';
import type { ResultType } from '../lib/result.js';
import { Result } from '../lib/result.js';

export const handleTelephoneNumberPostJSON = async (req: Request, res: Response): Promise<void> => {
  const validated = await validateTelephoneNumberRequest(req.body);

  if (!validated.success) {
    logError('Validation error', validated.error, createPayload(req, res));
    res.status(400).send(validated.error.message);
    return;
  }

  const request = validated.value;

  const telephoneNumber = /^\d{10}$/u.test(request.telephoneNumber)
    ? '+1' + request.telephoneNumber
    : request.telephoneNumber;

  const updateResult = await updateLeadTelephoneNumber({ leadId: request.leadId, telephoneNumber });

  if (updateResult.success) {
    const updateContactResult = await createBrevoContact(updateResult.value, undefined, undefined, undefined, undefined, undefined, [ request.listId ], request.telephoneNumber);
    if (!updateContactResult.success) {
      logError('Could not update Brevo contact', updateContactResult.error, createPayload(req, res));
    }
  }

  if (updateResult.success) {
    res.sendStatus(200);
  } else {
    logError('Unable to update lead', updateResult.error.message, createPayload(req, res));
    switch (updateResult.error.constructor) {
      default:
        res.status(500).send(updateResult.error.message);
    }
  }
};

const schema = z.object({
  leadId: z.uuid(),
  telephoneNumber: z.string(),
  listId: z.number().int().positive(),
});

const validateTelephoneNumberRequest = async (requestBody: Request['body']): Promise<ResultType<PostTelephoneNumberRequest>> => {
  try {
    const body = await schema.parseAsync(await requestBody);
    return Result.success(body);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'invalid request';
    return Result.fail(Error(message));
  }
};

import type { Request, Response } from 'express';
import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';
import { z } from 'zod';

import type { PostTelephoneNumberRequest } from '../domain/postTelephoneNumberRequest.mjs';
import { updateLeadTelephoneNumber } from '../interactors/leads.mjs';
import { createBrevoContact } from '../lib/brevo.mjs';
import { createPayload } from '../lib/createPayload.mjs';
import { logError } from '../logger.mjs';

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
    const updateContactResult = await createBrevoContact(updateResult.value, undefined, undefined, undefined, undefined, undefined, undefined, [ request.listId ], request.telephoneNumber);
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

const validateTelephoneNumberRequest = async (requestBody: Request['body']): Promise<Result<PostTelephoneNumberRequest>> => {
  try {
    const body = await schema.parseAsync(await requestBody);
    return success(body);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'invalid request';
    return failure(Error(message));
  }
};

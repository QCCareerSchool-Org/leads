import type { Request, Response } from 'express';
import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';
import { z } from 'zod';

import { getLead } from '#src/interactors/getLead.mjs';
import { updateTelephoneNumber } from '#src/lib/activecampaign.mjs';
import { updateLeadTelephoneNumber } from '../interactors/leads.mjs';
import { createBrevoContact } from '../lib/brevo.mjs';
import { createPayload } from '../lib/createPayload.mjs';

export const handleTelephoneNumberPost = async (req: Request, res: Response): Promise<void> => {
  if (req.method.toLowerCase() !== 'post') {
    res.sendStatus(405);
  }

  if (req.headers['content-type'] && req.headers['content-type'].toLowerCase().split(';', 1)[0]?.trim() !== 'application/json') {
    res.sendStatus(415);
    return;
  }

  const validationResult = await validate(req.body);

  if (!validationResult.success) {
    console.error('Validation error', validationResult.error, createPayload(req, res));
    res.status(400).send(validationResult.error.message);
    return;
  }

  const { body } = validationResult.value;

  const telephoneNumber = /^\d{10}$/u.test(body.telephoneNumber)
    ? '+1' + body.telephoneNumber
    : body.telephoneNumber;

  const updateResult = await updateLeadTelephoneNumber({ leadId: body.leadId, telephoneNumber });

  const leadResult = await getLead(body.leadId);
  if (!leadResult.success) {
    console.error(leadResult.error.message);
    res.status(500).send(leadResult.error.message);
    return;
  }

  if (updateResult.success) {
    let updateContactResult: Result;
    if (body.esp === 'ActiveCampaign') {
      updateContactResult = await updateTelephoneNumber(updateResult.value, body.telephoneNumber, leadResult.value.schoolName);
    } else {
      updateContactResult = await createBrevoContact(updateResult.value, undefined, undefined, undefined, undefined, undefined, undefined, [ body.listId ], body.telephoneNumber);
    }
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

const bodySchema: z.ZodType<PostRequest['body']> = z.object({
  leadId: z.uuid(),
  telephoneNumber: z.string(),
  listId: z.number().int().positive(),
  esp: z.enum([ 'Brevo', 'ActiveCampaign' ]).optional(),
});

const validate = async (requestBody: Request['body']): Promise<Result<PostRequest>> => {
  try {
    const body = await bodySchema.parseAsync(await requestBody);
    return success({ body });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'invalid request';
    return failure(Error(message));
  }
};

interface PostRequest {
  body: {
    leadId: string;
    telephoneNumber: string;
    listId: number;
    esp?: 'Brevo' | 'ActiveCampaign';
  };
}

import type { Request, Response } from 'express';
import { z } from 'zod';
import { zfd } from 'zod-form-data';
import { PostTelephoneNumberRequest } from './domain/postTelephoneNumberRequest';
import { updateLeadTelephoneNumber } from './leads';
import { logError } from './logger';
import { Result, ResultType } from './result';

export const handleTelephoneNumberPost = async (req: Request, res: Response): Promise<void> => {
  const validated = await validateTelephoneNumberRequest(req.body);

  if (!validated.success) {
    logError('Validation error', { error: validated.error.message, body: req.body, referrer: req.headers.referer });
    res.status(400).send(validated.error.message);
    return;
  }

  const request = validated.value;

  const updateResult = await updateLeadTelephoneNumber(request);

  if (updateResult.success) {
    res.send(200);
  } else {
    logError('Unable to update lead', { error: updateResult.error.message });
    switch (updateResult.error.constructor) {
      default:
        res.status(500).send(updateResult.error.message);
    }
  }
};

const schema = zfd.formData({
  leadId: zfd.text(z.string().uuid()),
  telephoneCountryCode: zfd.text(z.number().int().positive()),
  telephoneNumber: zfd.text(z.string()),
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

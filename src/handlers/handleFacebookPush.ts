import type { Request, Response } from 'express';
import z from 'zod';

import { isSchoolName } from '../domain/school.js';
import { faceBookAddPush } from '../interactors/facebookPush.js';

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

export const handleFacebookPush = async (req: Request<{ school: string }>, res: Response) => {
  const school = req.params.school;
  if (!isSchoolName(school)) {
    res.status(400).send('Invalid school');
    return;
  }

  const input = await schema.safeParseAsync(req.body);
  if (input.error) {
    res.status(400).send(input.error.message);
    return;
  }

  const result = await faceBookAddPush(input.data.firstName, input.data.lastName);

  if (result.success) {
    res.status(200).send(result.value);
  } else {
    const error = result.error;
    switch (error.constructor) {
      default:
        res.status(500).send(result.error.message);
    }
  }
};

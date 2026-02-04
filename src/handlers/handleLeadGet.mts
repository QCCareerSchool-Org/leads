import type { RequestHandler } from 'express';

import { getLead } from '#src/interactors/getLead.mjs';

interface Params {
  leadId: string;
}

export const handleLeadGet: RequestHandler<Params> = async (req, res) => {
  const leadId = req.params.leadId;

  const result = await getLead(leadId);
  if (!result.success) {
    switch (result.error.message) {
      case 'FormatError':
        res.status(400).send('Unable to parse UUID');
        return;
      case 'NotFound':
        res.status(404).send('Lead not found');
        return;
      default:
        res.status(500).send('Unknown error');
        return;
    }
  }

  res.send(result.value);
};

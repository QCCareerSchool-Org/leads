import type { Request, Response } from 'express';

export const createPayload = (req: Request, res: Response) => {
  const body = req.body as Record<string, string | undefined>;
  return {
    body,
    locals: res.locals,
    // headers: req.headers,
    formUrl: getFormUrl(body),
  };
};

const getFormUrl = (body: Record<string, string | undefined>): string | undefined => {
  if (!body.currentPage) {
    return;
  }

  const params = new URLSearchParams();
  if (body.gclid) {
    params.append('gclid', body.gclid);
  }
  if (body.msclkid) {
    params.append('msclkid', body.msclkid);
  }
  if (body.utmSource) {
    params.append('utm_source', body.utmSource);
  }
  if (body.utmMedium) {
    params.append('utm_medium', body.utmMedium);
  }
  if (body.utmCampaign) {
    params.append('utm_campaign', body.utmCampaign);
  }
  if (body.utmTerm) {
    params.append('utm_term', body.utmTerm);
  }
  return `${body.currentPage}?${params.toString()}`;
};

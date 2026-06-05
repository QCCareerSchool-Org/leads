import type { Request, Response } from 'express';

export const createPayload = (req: Request, res: Response) => {
  const body: unknown = req.body;

  return {
    body,
    locals: res.locals,
    // headers: req.headers,
    formUrl: getFormUrl(body),
  };
};

const getFormUrl = (body: unknown): string | undefined => {
  if (!isRecord(body) || typeof body.currentPage !== 'string' || !body.currentPage) {
    return;
  }

  const params = new URLSearchParams();
  appendParam(params, 'gclid', body.gclid);
  appendParam(params, 'msclkid', body.msclkid);
  appendParam(params, 'utm_source', body.utmSource);
  appendParam(params, 'utm_medium', body.utmMedium);
  appendParam(params, 'utm_campaign', body.utmCampaign);
  appendParam(params, 'utm_term', body.utmTerm);

  return `${body.currentPage}?${params.toString()}`;
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const appendParam = (params: URLSearchParams, name: string, value: unknown): void => {
  if (typeof value === 'string' && value) {
    params.append(name, value);
  }
};

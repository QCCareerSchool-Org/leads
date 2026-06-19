import type { RequestHandler } from 'express';

type Method =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS';

export const getMethodNotAllowedHandler = (actions?: Method[]): RequestHandler => (_req, res) => {
  if (actions) {
    res.set('Allow', actions.join(', '));
  }
  res.sendStatus(405);
};

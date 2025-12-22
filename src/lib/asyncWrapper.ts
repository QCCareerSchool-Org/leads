import type { NextFunction, Request, RequestHandler, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AsyncRequestHandler = (req: Request<any>, res: Response, next: NextFunction) => Promise<void>;

export const asyncWrapper = (fn: AsyncRequestHandler): RequestHandler => (req, res, next) => {
  fn(req, res, next).catch(next);
};

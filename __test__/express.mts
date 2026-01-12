import type { NextFunction, Request, Response } from 'express';

interface MockResponse extends Response {
  status: jest.Mock;
  send: jest.Mock;
  type: jest.Mock;
}

export const createReq = (overrides: Partial<Request> = {}): Request => ({
  headers: {},
  ...overrides,
}) as Request;

export const createRes = (overrides: Partial<MockResponse> = {}): MockResponse => {
  const res = {} as MockResponse;
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.type = jest.fn().mockReturnValue(res);

  return {
    ...res,
    ...overrides,
  } as MockResponse;
};

export const createNext = (): NextFunction => {
  return jest.fn();
};

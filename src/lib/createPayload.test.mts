import type { Request, Response } from 'express';

import { createPayload } from './createPayload.mjs';

const request = (body: unknown): Request => ({ body }) as Request;
const response = (locals: unknown): Response => ({ locals }) as Response;

describe('createPayload', () => {
  it('should include the request body and response locals', () => {
    const body = { emailAddress: 'test@example.com' };
    const locals = { ipAddress: '203.0.113.10' };

    expect(createPayload(request(body), response(locals))).toEqual({
      body,
      locals,
      formUrl: undefined,
    });
  });

  it('should not throw when the request body is undefined', () => {
    expect(createPayload(request(undefined), response({}))).toEqual({
      body: undefined,
      locals: {},
      formUrl: undefined,
    });
  });

  it('should not create a form URL when the request body is not an object', () => {
    expect(createPayload(request('not an object'), response({})).formUrl).toBeUndefined();
  });

  it('should not create a form URL when currentPage is missing', () => {
    expect(createPayload(request({ gclid: 'abc123' }), response({})).formUrl).toBeUndefined();
  });

  it('should create a form URL from currentPage and marketing parameters', () => {
    const payload = createPayload(request({
      currentPage: 'https://example.com/form',
      gclid: 'gclid-value',
      msclkid: 'msclkid-value',
      utmSource: 'google',
      utmMedium: 'cpc',
      utmCampaign: 'spring',
      utmTerm: 'design course',
    }), response({}));

    expect(payload.formUrl).toBe('https://example.com/form?gclid=gclid-value&msclkid=msclkid-value&utm_source=google&utm_medium=cpc&utm_campaign=spring&utm_term=design+course');
  });

  it('should ignore non-string form URL parameters', () => {
    const payload = createPayload(request({
      currentPage: 'https://example.com/form',
      gclid: 123,
      utmSource: 'google',
    }), response({}));

    expect(payload.formUrl).toBe('https://example.com/form?utm_source=google');
  });
});

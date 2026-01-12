import { Result } from 'generic-result-type';

import { createNext, createReq, createRes } from '#test/express.mjs';
import { verifyFBSignature } from './verifyFBSignature.mjs';
import { verifySignature } from '../lib/verifySignature.mjs';

jest.mock('../lib/verifySignature.mjs', () => ({
  verifySignature: jest.fn(),
}));

const verifySignatureMock = verifySignature as jest.MockedFunction<typeof verifySignature>;

describe('verifySignature middleware', () => {
  it('should call res.status(400) if the signature isn\'t present', () => {
    const rawBody = Buffer.from('ksjhdksjfhkasdjhfdksjh');
    const req = createReq({ rawBody });
    const res = createRes();
    const next = createNext();
    verifyFBSignature(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('X-Hub-Signature-256 header not found');
    expect(next).not.toHaveBeenCalled();
  });

  it('should call res.status(400) if the signature isn\'t a string', () => {
    const signature = 'c8cb72bc8cb3241efa33824fbe0a3c1498206db9d0f88b6ca90d3fc7707791cf';
    const rawBody = Buffer.from('ksjhdksjfhkasdjhfdksjh');
    const req = createReq({ rawBody, headers: { 'x-hub-signature-256': [ `sha256=${signature}` ] } });
    const res = createRes();
    const next = createNext();
    verifyFBSignature(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('X-Hub-Signature-256 header is not a string');
    expect(next).not.toHaveBeenCalled();
  });

  it('should call res.status(400) if signature format isn\'t correct', () => {
    const signature = 'c8cb72bc8cb3241efa33824fbe0a3c1498206db9d0f88b6ca90d3fc7707791cf';
    const rawBody = Buffer.from('ksjhdksjfhkasdjhfdksjh');
    const req = createReq({ rawBody, headers: { 'x-hub-signature-256': signature } }); // no "sha256="
    const res = createRes();
    const next = createNext();
    verifyFBSignature(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith('X-Hub-Signature-256 header has an invalid format');
    expect(next).not.toHaveBeenCalled();
  });

  it('should call res.status(500) if res.rawBuffer isn\'t set', () => {
    const signature = 'c8cb72bc8cb3241efa33824fbe0a3c1498206db9d0f88b6ca90d3fc7707791cf';
    const req = createReq({ headers: { 'x-hub-signature-256': `sha256=${signature}` } });
    const res = createRes();
    const next = createNext();
    verifyFBSignature(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Raw buffer not detected');
    expect(next).not.toHaveBeenCalled();
  });

  it('should call res.status(403) if the rawBody\'s hash doesn\'t matches the signature', () => {
    const errorMessage = 'hgksdfjhglsdfkjgh';
    verifySignatureMock.mockReturnValue(Result.fail(Error(errorMessage)));
    const rawBody = Buffer.from('3f8a9c1d72e4b5a0c6d1f92b8e47a3c59d0e4a7b1c6f82d5e93a04b7c1f6d8a2e5b9c0471a6d3f82c9e0b5a7d14f6c93', 'hex');
    const signature = 'c8cb72bc8cb3241efa33824fbe0a3c1498206db9d0f88b6ca90d3fc7707791cf';
    const req = createReq({ rawBody, headers: { 'x-hub-signature-256': `sha256=${signature}` } });
    const res = createRes();
    const next = createNext();
    verifyFBSignature(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith(errorMessage);
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if the rawBody\'s hash matches the signature', () => {
    verifySignatureMock.mockReturnValue(Result.success(undefined));
    const rawBody = Buffer.from('3f8a9c1d72e4b5a0c6d1f92b8e47a3c59d0e4a7b1c6f82d5e93a04b7c1f6d8a2e5b9c0471a6d3f82c9e0b5a7d14f6c93', 'hex');
    const signature = 'c8cb72bc8cb3241efa33824fbe0a3c1498206db9d0f88b6ca90d3fc7707791cf';
    const req = createReq({ rawBody, headers: { 'x-hub-signature-256': `sha256=${signature}` } });
    const res = createRes();
    const next = createNext();
    verifyFBSignature(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.send).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });
});

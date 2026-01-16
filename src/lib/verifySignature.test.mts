import { createSHA256Hash } from './createSHA256Hash.mjs';
import { verifySignature } from './verifySignature.mjs';

jest.mock('./createSHA256Hash.js', () => ({
  createSHA256Hash: jest.fn(),
}));

const createSHA256HashMock = createSHA256Hash as jest.MockedFunction<typeof createSHA256Hash>;

describe('verifySignature', () => {
  it('should return a success result when the signature matches', () => {
    const goodSignature = 'a3c59d0e4a7b1c6f82d5e93a04b';
    createSHA256HashMock.mockReturnValue(goodSignature);
    const buf = Buffer.from('3f8a9c1d72e4b5a0c6d1f92b8e47a3c59d0e4a7b1c6f82d5e93a04b7c1f6d8a2e5b9c0471a6d3f82c9e0b5a7d14f6c93', 'hex');
    const result = verifySignature(buf, goodSignature);
    expect(result.success).toBe(true);
  });

  it('should return a failure result when the signature doesn\'t', () => {
    const goodSignature = 'a3c59d0e4a7b1c6f82d5e93a04b';
    const otherSignature = 'b5a0c6d1f92b8e47a3c5';
    createSHA256HashMock.mockReturnValue(goodSignature);
    const buf = Buffer.from('3f8a9c1d72e4b5a0c6d1f92b8e47a3c59d0e4a7b1c6f82d5e93a04b7c1f6d8a2e5b9c0471a6d3f82c9e0b5a7d14f6c93', 'hex');
    const result = verifySignature(buf, otherSignature);
    expect(result.success).toBe(false);
  });
});

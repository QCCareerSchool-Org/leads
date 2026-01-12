import { createSHA256Hash } from './createSHA256Hash.mjs';

describe('createSHA256Hash', () => {

  it('should produce a proper hash', () => {
    const buf = Buffer.from('3f8a9c1d72e4b5a0c6d1f92b8e47a3c59d0e4a7b1c6f82d5e93a04b7c1f6d8a2e5b9c0471a6d3f82c9e0b5a7d14f6c93', 'hex');
    const signature = '498b69192089ecde3a2a482bf8854330092bda3f4f62cd73569bb103cb7bba64';
    const result = createSHA256Hash(buf);
    expect(result).toBe(signature);
  });
});

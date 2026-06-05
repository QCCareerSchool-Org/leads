import { binToUUID, createUUID, uuidToBin } from './uuid.mjs';

describe('createUUID', () => {
  it('should create a valid UUID string', () => {
    expect(createUUID()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-1[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u);
  });
});

describe('uuidToBin', () => {
  it('should convert a UUID to swapped binary format', () => {
    const result = uuidToBin('00112233-4455-6677-8899-aabbccddeeff');

    expect(Buffer.from(result).toString('hex')).toBe('66774455001122338899aabbccddeeff');
  });

  it('should throw when the UUID has an invalid length', () => {
    expect(() => uuidToBin('00112233-4455-6677-8899-aabbccddee')).toThrow('Invalid uuid length');
  });

  it('should throw when the UUID has an invalid format', () => {
    expect(() => uuidToBin('00112233-4455-6677-8899-aabbccddeegf')).toThrow('Invalid uuid format');
  });
});

describe('binToUUID', () => {
  it('should convert swapped binary format to a UUID', () => {
    const buffer = Buffer.from('66774455001122338899aabbccddeeff', 'hex');

    expect(binToUUID(buffer)).toBe('00112233-4455-6677-8899-aabbccddeeff');
  });

  it('should throw when the buffer has an invalid length', () => {
    expect(() => binToUUID(Buffer.from('00112233', 'hex'))).toThrow('Invalid buffer length');
  });
});

describe('UUID binary conversion', () => {
  it('should round trip a UUID through binary format', () => {
    const uuid = '00112233-4455-6677-8899-aabbccddeeff';

    expect(binToUUID(uuidToBin(uuid))).toBe(uuid);
  });
});

import { v1 } from 'uuid';

export const createUUID = (): string => {
  return v1();
};

export const uuidToBin = (uuid: string): Uint8Array<ArrayBuffer> => {
  if (uuid.length !== 36) {
    throw Error('Invalid uuid length');
  }
  if (!/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/u.test(uuid)) {
    throw Error('Invalid uuid format');
  }
  // remove hyphens
  const hex = uuid.replace(/-/gu, '');
  const buffer = Buffer.from(hex, 'hex');
  return swap(buffer);
};

export const binToUUID = (buffer: Uint8Array): string => {
  if (buffer.length !== 16) {
    throw Error('Invalid buffer length');
  }
  const unswappedBuffer = unswap(buffer);
  const hex = Buffer.from(unswappedBuffer).toString('hex');
  // re-add hyphens
  return `${hex.substring(0, 8)}-${hex.substring(8, 12)}-${hex.substring(12, 16)}-${hex.substring(16, 20)}-${hex.substring(20, 32)}`;
};

const swap = (buffer: Uint8Array): Uint8Array<ArrayBuffer> => {
  if (buffer.length !== 16) {
    throw Error('Invalid buffer length');
  }
  const swappedBuffer = Buffer.alloc(16);
  const source = Buffer.from(buffer);

  source.copy(swappedBuffer, 0, 6, 8);
  source.copy(swappedBuffer, 2, 4, 6);
  source.copy(swappedBuffer, 4, 0, 4);
  source.copy(swappedBuffer, 8, 8, 16);

  return swappedBuffer;
};

const unswap = (buffer: Uint8Array): Uint8Array<ArrayBuffer> => {
  if (buffer.length !== 16) {
    throw Error('Invalid buffer length');
  }
  const unswappedBuffer = Buffer.alloc(16);
  const source = Buffer.from(buffer);

  source.copy(unswappedBuffer, 0, 4, 8);
  source.copy(unswappedBuffer, 4, 2, 4);
  source.copy(unswappedBuffer, 6, 0, 2);
  source.copy(unswappedBuffer, 8, 8, 16);

  return unswappedBuffer;
};

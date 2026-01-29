import ipaddr from 'ipaddr.js';

export const parseIpAddress = (ip: string): Uint8Array<ArrayBuffer> | null => {
  try {
    return Buffer.from(ipaddr.parse(ip).toByteArray());
  } catch {
    return null;
  }
};

export const stringifyBuffer = (buf: Uint8Array<ArrayBuffer>): string => {
  return ipaddr.fromByteArray(Array.from(buf)).toString();
};

import ipaddr from 'ipaddr.js';

export const parseIpAddress = (ip: string): Buffer | null => {
  try {
    return Buffer.from(ipaddr.parse(ip).toByteArray());
  } catch {
    return null;
  }
};

export const stringifyBuffer = (buf: Buffer): string => {
  return ipaddr.fromByteArray(Array.from(buf)).toString();
};

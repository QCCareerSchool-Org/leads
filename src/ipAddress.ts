import ipaddr from 'ipaddr.js';

export const parseIpAddress = (ip: string): Buffer | null => {
  try {
    return Buffer.from(ipaddr.parse(ip).toByteArray());
  } catch (err) {
    return null;
  }
};

export const stringifyBuffer = (buf: Buffer): string => {
  return ipaddr.fromByteArray(Array.from(buf)).toString();
};

import ipaddr from 'ipaddr.js';

export const parseIpAddress = (ip: string): Buffer => {
  return Buffer.from(ipaddr.parse(ip).toByteArray());
};

export const stringifyBuffer = (buf: Buffer): string => {
  return ipaddr.fromByteArray(Array.from(buf)).toString();
};

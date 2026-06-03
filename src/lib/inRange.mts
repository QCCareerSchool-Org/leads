import net from 'node:net';

interface IpRange {
  ipAddress: Uint8Array<ArrayBuffer>;
  prefixLength: number;
}

interface ParsedIpAddress {
  bytes: Uint8Array<ArrayBuffer>;
  version: 4 | 6;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Locals {
      user?: {
        id: number;
        name: string;
      };
    }
  }
}

const isIpv4MappedAddress = (ipAddress: Uint8Array<ArrayBuffer>): boolean => (
  ipAddress.slice(0, 10).every(byte => byte === 0)
  && ipAddress[10] === 0xff
  && ipAddress[11] === 0xff
);

const parseIpAddress = (ipAddress: string): ParsedIpAddress | null => {
  const normalizedIpAddress = ipAddress.startsWith('::ffff:')
    ? ipAddress.slice('::ffff:'.length)
    : ipAddress;

  if (net.isIPv4(normalizedIpAddress)) {
    const bytes = new Uint8Array(16);
    bytes[10] = 0xff;
    bytes[11] = 0xff;

    normalizedIpAddress
      .split('.')
      .forEach((part, index) => { bytes[index + 12] = Number(part); });

    return { bytes, version: 4 };
  }

  if (!net.isIPv6(ipAddress)) {
    return null;
  }

  let ipv6Address = ipAddress;
  if (ipAddress.includes('.')) {
    const lastColonIndex = ipAddress.lastIndexOf(':');
    const embeddedIpv4Address = ipAddress.slice(lastColonIndex + 1);

    if (lastColonIndex === -1 || !net.isIPv4(embeddedIpv4Address)) {
      return null;
    }

    const ipv4Bytes = embeddedIpv4Address.split('.').map(Number);
    // eslint-disable-next-line no-bitwise
    const firstIpv6Group = (ipv4Bytes[0] << 8) + ipv4Bytes[1];
    // eslint-disable-next-line no-bitwise
    const secondIpv6Group = (ipv4Bytes[2] << 8) + ipv4Bytes[3];

    ipv6Address = `${ipAddress.slice(0, lastColonIndex + 1)}${firstIpv6Group.toString(16)}:${secondIpv6Group.toString(16)}`;
  }

  const ipv6Groups: number[] = [];

  if (ipv6Address.includes('::')) {
    const [ head, tail ] = ipv6Address.split('::');
    const headGroups = head ? head.split(':').map(group => Number.parseInt(group, 16)) : [];
    const tailGroups = tail ? tail.split(':').map(group => Number.parseInt(group, 16)) : [];

    ipv6Groups.push(...headGroups);
    ipv6Groups.push(...Array<number>(8 - headGroups.length - tailGroups.length).fill(0));
    ipv6Groups.push(...tailGroups);
  } else {
    ipv6Groups.push(...ipv6Address.split(':').map(group => Number.parseInt(group, 16)));
  }

  if (ipv6Groups.length !== 8 || ipv6Groups.some(group => Number.isNaN(group))) {
    return null;
  }

  const bytes = new Uint8Array(16);
  ipv6Groups.forEach((group, index) => {
    // eslint-disable-next-line no-bitwise
    bytes[index * 2] = group >> 8;
    // eslint-disable-next-line no-bitwise
    bytes[(index * 2) + 1] = group & 0xff;
  });

  return { bytes, version: 6 };
};

const hasPrefix = (
  ipAddress: Uint8Array<ArrayBuffer>,
  rangeAddress: Uint8Array<ArrayBuffer>,
  prefixLength: number,
  offset = 0,
): boolean => {
  const fullBytes = Math.floor(prefixLength / 8);
  const remainingBits = prefixLength % 8;

  for (let index = 0; index < fullBytes; index += 1) {
    if (ipAddress[index + offset] !== rangeAddress[index + offset]) {
      return false;
    }
  }

  if (remainingBits === 0) {
    return true;
  }

  // eslint-disable-next-line no-bitwise
  const mask = (0xff << (8 - remainingBits)) & 0xff;

  // eslint-disable-next-line no-bitwise
  return (ipAddress[fullBytes + offset] & mask) === (rangeAddress[fullBytes + offset] & mask);
};

export const inRange = (ipAddress: string | null, ranges: IpRange[]): boolean => {
  if (!ipAddress) {
    return false;
  }

  const parsedIpAddress = parseIpAddress(ipAddress);
  if (!parsedIpAddress) {
    return false;
  }

  return ranges.some(range => {
    if (range.ipAddress.length !== 16 || range.prefixLength < 0 || range.prefixLength > 128) {
      return false;
    }

    if (parsedIpAddress.version === 4 && isIpv4MappedAddress(range.ipAddress) && range.prefixLength <= 32) {
      return hasPrefix(parsedIpAddress.bytes, range.ipAddress, range.prefixLength, 12);
    }

    return hasPrefix(parsedIpAddress.bytes, range.ipAddress, range.prefixLength);
  });
};

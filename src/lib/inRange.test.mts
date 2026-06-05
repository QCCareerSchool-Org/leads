import type { IpRange } from './inRange.mjs';
import { inRange } from './inRange.mjs';

const ipv4Range = (ipAddress: string, prefixLength: number): IpRange => ({
  ipAddress: Buffer.from([
    ...Array<number>(10).fill(0),
    0xff,
    0xff,
    ...ipAddress.split('.').map(Number),
  ]),
  prefixLength,
});

const ipv6Range = (groups: number[], prefixLength: number): IpRange => ({
  ipAddress: Buffer.from(groups.flatMap(group => [
    Math.floor(group / 256),
    group % 256,
  ])),
  prefixLength,
});

describe('inRange', () => {
  it('returns false when the request IP is missing or invalid', () => {
    const ranges = [ ipv4Range('192.0.2.10', 32) ];

    expect(inRange(null, ranges)).toBe(false);
    expect(inRange('not-an-ip', ranges)).toBe(false);
  });

  it('returns false when no ranges are supplied', () => {
    expect(inRange('192.0.2.10', [])).toBe(false);
  });

  it('matches an exact IPv4 address stored as an IPv4-mapped IPv6 address', () => {
    expect(inRange('192.0.2.10', [ ipv4Range('192.0.2.10', 32) ])).toBe(true);
    expect(inRange('192.0.2.11', [ ipv4Range('192.0.2.10', 32) ])).toBe(false);
  });

  it('matches IPv4 CIDR ranges with whole-byte prefixes', () => {
    const ranges = [ ipv4Range('198.51.100.0', 24) ];

    expect(inRange('198.51.100.42', ranges)).toBe(true);
    expect(inRange('198.51.101.42', ranges)).toBe(false);
  });

  it('matches IPv4 CIDR ranges with partial-byte prefixes', () => {
    const ranges = [ ipv4Range('203.0.113.128', 25) ];

    expect(inRange('203.0.113.129', ranges)).toBe(true);
    expect(inRange('203.0.113.127', ranges)).toBe(false);
  });

  it('matches IPv4-mapped request addresses against IPv4 ranges', () => {
    expect(inRange('::ffff:192.0.2.10', [ ipv4Range('192.0.2.0', 24) ])).toBe(true);
  });

  it('matches exact IPv6 addresses', () => {
    const ranges = [ ipv6Range([ 0x2001, 0x0db8, 0, 0, 0, 0, 0, 1 ], 128) ];

    expect(inRange('2001:db8::1', ranges)).toBe(true);
    expect(inRange('2001:db8::2', ranges)).toBe(false);
  });

  it('matches IPv6 CIDR ranges with compressed addresses', () => {
    const ranges = [ ipv6Range([ 0x2001, 0x0db8, 0x1234, 0x5600, 0, 0, 0, 0 ], 56) ];

    expect(inRange('2001:db8:1234:56ff::abcd', ranges)).toBe(true);
    expect(inRange('2001:db8:1234:5700::abcd', ranges)).toBe(false);
  });

  it('matches IPv6 addresses with embedded IPv4 notation', () => {
    const ranges = [ ipv6Range([ 0x2001, 0x0db8, 0, 0, 0, 0xffff, 0xc000, 0x0200 ], 120) ];

    expect(inRange('2001:db8::ffff:192.0.2.42', ranges)).toBe(true);
    expect(inRange('2001:db8::ffff:192.0.3.42', ranges)).toBe(false);
  });

  it('supports zero-length prefixes', () => {
    expect(inRange('192.0.2.10', [ ipv4Range('0.0.0.0', 0) ])).toBe(true);
    expect(inRange('2001:db8::1', [ ipv6Range([ 0, 0, 0, 0, 0, 0, 0, 0 ], 0) ])).toBe(true);
  });

  it('ignores malformed range records', () => {
    const shortRange: IpRange = {
      ipAddress: Buffer.from([ 192, 0, 2, 10 ]),
      prefixLength: 32,
    };

    expect(inRange('192.0.2.10', [ shortRange ])).toBe(false);
    expect(inRange('192.0.2.10', [ ipv4Range('192.0.2.10', -1) ])).toBe(false);
    expect(inRange('192.0.2.10', [ ipv4Range('192.0.2.10', 129) ])).toBe(false);
  });
});

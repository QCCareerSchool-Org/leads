/* eslint-disable camelcase */
import { isBot } from '../../../dist/lib/isBot.js';

interface Payload {
  id: string;
  body: {
    emailAddress: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    _hp_kjf2343: string | undefined;
  };
  countryCode: string;
}

const goodPayloads: Payload[] = [];
const badPayloads: Payload[] = [
  {
    id: 'megan',
    body: {
      emailAddress: 'megan@gmail.com',
      firstName: 'Megan Smith',
      lastName: 'Megan Smith',
      _hp_kjf2343: undefined,
    },
    countryCode: 'CA',
  },
];

describe('isBot', () => {
  goodPayloads.forEach(payload => {
    it(`${payload.id} should not be a bot`, () => {
      const botStatus = isBot(payload.body, payload.countryCode);

      expect(botStatus.result).toBe(false);
    });
  });

  badPayloads.forEach(payload => {
    it(`${payload.id} should be a bot`, () => {
      const botStatus = isBot(payload.body, payload.countryCode);

      expect(botStatus.result).toBe(true);
    });
  });
});

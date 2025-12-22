import { isGibberish } from '../../../src/lib/isGibberish.ts';

describe('isGibberish', () => {
  [ 'Arnold', 'Schwarzenegger', 'Dave', 'Welsh' ].forEach(name => {
    it(`${name} should not be gibberish`, () => {
      const gibberish = isGibberish(name);

      expect(gibberish).toBe(false);
    });
  });

  [ 'ltkgozjzdx', 'jwiyulmq' ].forEach(name => {
    it(`${name} should be gibberish`, () => {
      const gibberish = isGibberish(name);

      expect(gibberish).toBe(true);
    });
  });
});

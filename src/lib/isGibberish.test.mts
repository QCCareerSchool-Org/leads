import { isGibberish } from './isGibberish.mjs';

describe('isGibberish', () => {
  [ 'Arnold', 'Schwarzenegger', 'Dave', 'Welsh' ].forEach(name => {
    it(`${name} should not be gibberish`, () => {
      const gibberish = isGibberish(name);

      expect(gibberish).toBe(false);
    });
  });

  [ 'mBdzhkuNRlumGLmWZMoIlgiC', 'aAPXkKgDYwnUjmrmbKyjbP' ].forEach(name => {
    it(`${name} should be gibberish`, () => {
      const gibberish = isGibberish(name);

      expect(gibberish).toBe(true);
    });
  });
});

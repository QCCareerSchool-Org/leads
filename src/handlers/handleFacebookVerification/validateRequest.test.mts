// import { faker } from '@faker-js/faker';

import { validateRequest } from './validateRequest.mjs';

describe('handleFacebookVerification validateRequest', () => {
  it('should fail if any of the keys are missing', async () => {
    const body = { };
    const result = await validateRequest(body);

    expect(result.success).toBe(false);
  });

  it('should succeed if all keys are present and valid', async () => {
    const body = {
      'hub.mode': 'subscribe',
      'hub.challenge': 1000, // faker.number.int(1000),
      'hub.verify_token': 'a4', // faker.string.hexadecimal({ length: 16 }),
    };
    const result = await validateRequest(body);

    expect(result.success).toBe(true);
  });
});

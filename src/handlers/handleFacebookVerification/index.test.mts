import { faker } from '@faker-js/faker';
import { Result } from 'generic-result-type';

import { createNext, createReq, createRes } from '#test/express.mjs';
import { handleFacebookVerification } from './index.mjs';
import { validateRequest } from './validateRequest.mjs';
import type { FBVerification } from '../../domain/facebook.mjs';
import { verify } from '../../interactors/facebook.mjs';

jest.mock('./validateRequest.mjs', () => ({
  validateRequest: jest.fn(),
}));

jest.mock('../../interactors/facebook.mjs', () => ({
  verify: jest.fn(),
}));

const validateRequestMock = validateRequest as jest.MockedFunction<typeof validateRequest>;
const verifyMock = verify as jest.MockedFunction<typeof verify>;

describe('handleFacebookVerification handler', () => {
  it('should call res.status(400) if the request is invalid', async () => {
    const errorMessage = faker.lorem.words();
    const challenge = faker.number.int(1000);
    validateRequestMock.mockResolvedValue(Result.fail(Error(errorMessage)));
    verifyMock.mockReturnValue(Result.success(challenge));
    const req = createReq();
    const res = createRes();
    const next = createNext();
    await handleFacebookVerification(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(errorMessage);
  });

  it('should call res.status(403) if the verification fails', async () => {
    const errorMessage = faker.lorem.words();
    const challenge = faker.number.int(1000);
    const body: FBVerification = {
      'hub.mode': 'subscribe',
      'hub.challenge': challenge,
      'hub.verify_token': faker.string.hexadecimal({ length: 16 }),
    };
    validateRequestMock.mockResolvedValue(Result.success(body));
    verifyMock.mockReturnValue(Result.fail(Error(errorMessage)));
    const req = createReq({ body });
    const res = createRes();
    const next = createNext();
    await handleFacebookVerification(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith(errorMessage);
  });

  it('should call res.status(200) if the verification passes', async () => {
    const challenge = faker.number.int(1000);
    const body: FBVerification = {
      'hub.mode': 'subscribe',
      'hub.challenge': challenge,
      'hub.verify_token': faker.string.hexadecimal({ length: 16 }),
    };
    validateRequestMock.mockResolvedValue(Result.success(body));
    verifyMock.mockReturnValue(Result.success(challenge));
    const req = createReq({ body });
    const res = createRes();
    const next = createNext();
    await handleFacebookVerification(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(challenge);
  });
});

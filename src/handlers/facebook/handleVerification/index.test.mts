import { faker } from '@faker-js/faker';
import { fail, success } from 'generic-result-type';

import type { FBVerification } from '#src/domain/facebook/verification.mjs';
import { verify } from '#src/interactors/facebook/verify.mjs';
import { createNext, createReq, createRes } from '#test/express.mjs';
import { handleVerification } from './index.mjs';
import { validateRequest } from './validateRequest.mjs';

jest.mock('./validateRequest.mjs', () => ({
  validateRequest: jest.fn(),
}));

jest.mock('#src/interactors/facebook/verify.mjs', () => ({
  verify: jest.fn(),
}));

const validateRequestMock = validateRequest as jest.MockedFunction<typeof validateRequest>;
const verifyMock = verify as jest.MockedFunction<typeof verify>;

describe('handleFacebookVerification handler', () => {
  it('should call res.status(400) if the request is invalid', async () => {
    const errorMessage = faker.lorem.words();
    const challenge = faker.number.int(1000);
    validateRequestMock.mockResolvedValue(fail(Error(errorMessage)));
    verifyMock.mockReturnValue(success(challenge));
    const req = createReq();
    const res = createRes();
    const next = createNext();
    await handleVerification(req, res, next);

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
    validateRequestMock.mockResolvedValue(success(body));
    verifyMock.mockReturnValue(fail(Error(errorMessage)));
    const req = createReq({ body });
    const res = createRes();
    const next = createNext();
    await handleVerification(req, res, next);

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
    validateRequestMock.mockResolvedValue(success(body));
    verifyMock.mockReturnValue(success(challenge));
    const req = createReq({ body });
    const res = createRes();
    const next = createNext();
    await handleVerification(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(challenge);
  });
});

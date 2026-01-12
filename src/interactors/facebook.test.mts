import type { FBVerification } from '../domain/facebook.mjs';
import { verify } from '../interactors/facebook.mjs';

describe('facebook interactor', () => {
  describe('verify', () => {
    it('should fail if the verification token doesn\'t match what we expect', () => {
      const payload: FBVerification = {
        'hub.mode': 'subscribe',
        'hub.challenge': 94850349,
        'hub.verify_token': 'Something that is definitely not our token',
      };
      const result = verify(payload);
      expect(result.success).toBe(false);
    });
  });
});

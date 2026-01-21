import type { FBVerification } from '#src/domain/facebook/verification.mjs';
import { fbVerify } from './verify.mjs';

describe('facebook interactor', () => {
  describe('verify', () => {
    it('should fail if the verification token doesn\'t match what we expect', () => {
      const payload: FBVerification = {
        'hub.mode': 'subscribe',
        'hub.challenge': 94850349,
        'hub.verify_token': 'Something that is definitely not our token',
      };
      const result = fbVerify(payload);
      expect(result.success).toBe(false);
    });
  });
});

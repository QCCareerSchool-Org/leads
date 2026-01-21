export type FBVerifyMode = 'subscribe';

export interface FBVerification {
  'hub.mode': FBVerifyMode;
  'hub.challenge': number;
  'hub.verify_token': string;
}

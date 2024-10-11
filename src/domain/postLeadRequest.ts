import { SchoolName } from './school';

export type PostLeadRequest = {
  school: SchoolName;
  successLocation: string;
  emailAddress: string;
  firstName?: string;
  lastName?: string;
  telephoneNumber?: string;
  emailOptIn?: boolean;
  smsOptIn?: boolean;
  gclid?: string;
  msclkid?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  courseCodes?: string[];
  emailTemplateId?: number;
  listId?: number;
  nonce?: string;
  'g-recaptcha-response': string;
  referrer?: string;
};

import type { SchoolName } from './school.js';

export interface PostLeadRequest {
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
  telephoneListId?: number;
  nonce?: string;
  'g-recaptcha-response': string;
  referrer?: string;
}

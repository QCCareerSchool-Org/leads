import type { JsonValue } from '../json.mjs';

export interface Leadgen {
  /** string date */
  created_time: string;
  id: string;
  field_data: LeadgenFieldData[];
  custom_disclaimer_responses: CustomDisclaimerResponse[];
}

interface CustomDisclaimerResponse {
  checkbox_key: string;
  /* numeric string */
  is_checked: string;
}

interface LeadgenFieldData {
  [k: string]: JsonValue;
  name: string;
  values: string[];
}

export const isLeadgen = (obj: unknown): obj is Leadgen => {
  return obj !== null && typeof obj === 'object' &&
    'created_time' in obj && typeof obj.created_time === 'string' &&
    'id' in obj && typeof obj.id === 'string' &&
    'field_data' in obj && Array.isArray(obj.field_data) && obj.field_data.every(isLeadgenFieldData) &&
    'custom_disclaimer_responses' in obj && Array.isArray(obj.custom_disclaimer_responses) && obj.custom_disclaimer_responses.every(isLeadgenCustomDislaimerResponse);
};

const isLeadgenFieldData = (obj: unknown): obj is LeadgenFieldData => {
  return obj !== null && typeof obj === 'object' &&
    'name' in obj && typeof obj.name === 'string' &&
    'values' in obj && Array.isArray(obj.values) && obj.values.every(v => typeof v === 'string');
};

const isLeadgenCustomDislaimerResponse = (obj: unknown): obj is CustomDisclaimerResponse => {
  return obj !== null && typeof obj === 'object' &&
    'checkbox_key' in obj && typeof obj.checkbox_key === 'string' &&
    'is_checked' in obj && typeof obj.is_checked === 'string';
};

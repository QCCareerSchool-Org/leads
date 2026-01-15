import type { JsonValue } from '../json.mjs';

export interface Leadgen {
  /** string date */
  created_time: string;
  id: string;
  field_data: LeadgenFieldData[];
}

interface LeadgenFieldData {
  [k: string]: JsonValue;
  name: string;
  values: string[];
}

export const isLeadGen = (obj: unknown): obj is Leadgen => {
  return obj !== null && typeof obj === 'object' &&
    'created_time' in obj && typeof obj.created_time === 'string' &&
    'id' in obj && typeof obj.id === 'string' &&
    'field_data' in obj && Array.isArray(obj.field_data) && obj.field_data.every(isLeadGenFieldData);
};

const isLeadGenFieldData = (obj: unknown): obj is LeadgenFieldData => {
  return obj !== null && typeof obj === 'object' &&
    'name' in obj && typeof obj.name === 'string' &&
    'values' in obj && Array.isArray(obj.values) && obj.values.every(v => typeof v === 'string');
};

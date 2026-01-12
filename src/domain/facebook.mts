export interface FBChange {
  field: string;
}

interface FBLeadGenChangeValueFieldData {
  name: string;
  values: string[];
}

interface FBLeadGenChangeValue {
  ad_id: string;
  form_id: string;
  leadgen_id: string;
  created_time: number;
  page_id: string;
  adgroup_id: number;
  custom_disclaimer_responses: string[];
  field_data: FBLeadGenChangeValueFieldData[];
}

export interface FBLeadGenChange extends FBChange {
  field: 'leadgen';
  value: FBLeadGenChangeValue;
}

export interface FBEntry {
  id: string;
  uid?: string;
  time: number;
  changes: FBChange[];
}

export interface FBLeadGenEntry extends FBEntry {
  changes: FBLeadGenChange[];
}

export const isFBLeadGenChange = (obj: unknown): obj is FBLeadGenChange => {
  return obj !== null && typeof obj === 'object' &&
    'field' in obj && obj.field === 'leadgen' &&
    'value' in obj && obj.value !== null && typeof obj.value === 'object' && isFBLeadGenChangeValue(obj.value);
};

const isFBLeadGenChangeValue = (obj: unknown): obj is FBLeadGenChangeValue => {
  return obj !== null && typeof obj === 'object' &&
    'ad_id' in obj && typeof obj.ad_id === 'string' &&
    'form_id' in obj && typeof obj.form_id === 'string' &&
    'leadgen_id' in obj && typeof obj.leadgen_id === 'string' &&
    'created_time' in obj && typeof obj.created_time === 'number' &&
    'page_id' in obj && typeof obj.page_id === 'string' &&
    'adgroup_id' in obj && typeof obj.adgroup_id === 'string' &&
    'custom_disclaimer_responses' in obj && Array.isArray(obj.custom_disclaimer_responses) &&
    'field_data' in obj && Array.isArray(obj.field_data) && obj.field_data.every(isFBLeadGenChangeValueFieldData);
};

const isFBLeadGenChangeValueFieldData = (obj: unknown): obj is FBLeadGenChangeValueFieldData => {
  return obj !== null && typeof obj === 'object' &&
    'name' in obj && typeof obj.name === 'string' &&
    'values' in obj && Array.isArray(obj.values) && obj.values.every(v => typeof v === 'string');
};

export interface FBPayload {
  entry: FBEntry[];
  object: string;
}

export type FBVerifyMode = 'subscribe';

export interface FBVerification {
  'hub.mode': FBVerifyMode;
  'hub.challenge': number;
  'hub.verify_token': string;
}

import { logDebug } from '#src/logger.mjs';

export interface FBChange {
  field: string;
}

export interface FBLeadgenChange extends FBChange {
  field: 'leadgen';
  value: FBLeadgenChangeValue;
}

interface FBLeadgenChangeValue {
  leadgen_id: string;
  page_id: string;
  form_id: string;
  created_time: number;
}

export const isFBChange = (obj: unknown): obj is FBChange => {
  const result = obj !== null && typeof obj === 'object' &&
    'field' in obj && typeof obj.field === 'string';
  if (!result) {
    logDebug('Not an FBChange', obj);
  }
  return result;
};

export const isFBLeadgenChange = (obj: unknown): obj is FBLeadgenChange => {
  const result = isFBChange(obj) && obj.field === 'leadgen' &&
    'value' in obj && isFBLeadgenChangeValue(obj.value);
  if (!result) {
    logDebug('Not an FBLeadgenChange', obj);
  }
  return result;
};

const isFBLeadgenChangeValue = (obj: unknown): obj is FBLeadgenChangeValue => {
  const result = obj !== null && typeof obj === 'object' &&
    'leadgen_id' in obj && typeof obj.leadgen_id === 'string' &&
    'page_id' in obj && typeof obj.page_id === 'string' &&
    'form_id' in obj && typeof obj.form_id === 'string' &&
    'created_time' in obj && typeof obj.created_time === 'number';
  if (!result) {
    logDebug('Not an FBLeadgenChangeValue', obj);
  }
  return result;
};

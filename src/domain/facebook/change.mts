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
  return obj !== null && typeof obj === 'object' &&
    'field' in obj && typeof obj.field === 'string';
};

export const isFBLeadgenChange = (obj: unknown): obj is FBLeadgenChange => {
  return isFBChange(obj) && obj.field === 'leadgen' &&
    'value' in obj && isFBLeadgenChangeValue(obj.value);
};

const isFBLeadgenChangeValue = (obj: unknown): obj is FBLeadgenChangeValue => {
  return obj !== null && typeof obj === 'object' &&
    'leadgen_id' in obj && typeof obj.leadgen_id === 'string' &&
    'page_id' in obj && typeof obj.page_id === 'string' &&
    'form_id' in obj && typeof obj.form_id === 'string' &&
    'created_time' in obj && typeof obj.created_time === 'number';
};

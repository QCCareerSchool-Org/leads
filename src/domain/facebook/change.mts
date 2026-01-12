export interface FBChange {
  field: string;
}

const isFBChange = (obj: unknown): obj is FBChange => {
  return obj !== null && typeof obj === 'object' &&
    'field' in obj && typeof obj.field === 'string';
};

export interface FBLeadGenChange extends FBChange {
  field: 'leadgen';
  value: FBLeadGenChangeValue;
}

export const isFBLeadGenChange = (obj: unknown): obj is FBLeadGenChange => {
  return isFBChange(obj) && obj.field === 'leadgen' &&
  'value' in obj && Array.isArray(obj.value) && obj.value.every(isFBLeadGenChangeValue);
};

interface FBLeadGenChangeValue {
  leadgen_id: string;
  page_id: string;
  form_id: string;
  adgroup_id: string;
  ad_id: string;
  created_time: number;
}

const isFBLeadGenChangeValue = (obj: unknown): obj is FBLeadGenChange => {
  return obj !== null && typeof obj === 'object' &&
    'leadgen_id' in obj && typeof obj.leadgen_id === 'string' &&
    'page_id' in obj && typeof obj.page_id === 'string' &&
    'form_id' in obj && typeof obj.form_id === 'string' &&
    'adgroup_id' in obj && typeof obj.adgroup_id === 'string' &&
    'ad_id' in obj && typeof obj.ad_id === 'string' &&
    'created_time' in obj && typeof obj.created_time === 'number';
};

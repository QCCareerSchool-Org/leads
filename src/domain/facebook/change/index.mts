export interface FBChange {
  field: string;
}

export const isFBChange = (obj: unknown): obj is FBChange => {
  return obj !== null && typeof obj === 'object' &&
    'field' in obj && typeof obj.field === 'string';
};

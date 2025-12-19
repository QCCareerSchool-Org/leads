export const schools = [ 'QC Makeup Academy', 'QC Design School', 'QC Event School', 'QC Pet Studies', 'QC Wellness Studies', 'Winghill Writing School' ] as const;

export type SchoolName = typeof schools[number];

const schoolSet = new Set<SchoolName>(schools);

export const isSchoolName = (obj: unknown): obj is SchoolName => {
  return typeof obj === 'string' && schoolSet.has(obj as SchoolName);
};

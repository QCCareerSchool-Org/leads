export type SchoolName = 'QC Makeup Academy' | 'QC Design School' | 'QC Event School' | 'QC Pet Studies' | 'QC Wellness Studies' | 'Winghill Writing School';

export const schools = [ 'QC Makeup Academy', 'QC Design School', 'QC Event School', 'QC Pet Studies', 'QC Wellness Studies', 'Winghill Writing School' ] as const;

export const isSchoolName = (s: string): s is SchoolName => (schools as unknown as string[]).includes(s);

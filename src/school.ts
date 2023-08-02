export type SchoolName = 'QC Makeup Academy' | 'QC Design School' | 'QC Event School' | 'QC Pet Studies' | 'QC Wellness Studies' | 'Winghill Writing School';

export const schools: SchoolName[] = [ 'QC Makeup Academy', 'QC Design School', 'QC Event School', 'QC Pet Studies', 'QC Wellness Studies', 'Winghill Writing School' ];

export const isSchoolName = (s: string): s is SchoolName => (schools as string[]).includes(s);

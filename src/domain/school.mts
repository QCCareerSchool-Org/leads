export const schools = [ 'QC Design School', 'QC Event School', 'QC Makeup Academy', 'QC Pet Studies', 'QC Wellness Studies', 'Winghill Writing School' ] as const;

export type SchoolName = typeof schools[number];

const schoolSet = new Set<SchoolName>(schools);

export const isSchoolName = (obj: unknown): obj is SchoolName => {
  return typeof obj === 'string' && schoolSet.has(obj as SchoolName);
};

export const schoolSlugs = [ 'design', 'event', 'makeup', 'pet', 'wellness', 'writing' ] as const;

export type SchoolSlug = typeof schoolSlugs[number];

const schoolSlugSet = new Set<SchoolSlug>(schoolSlugs);

export const isSchoolSlug = (obj: unknown): obj is SchoolSlug => {
  return typeof obj === 'string' && schoolSlugSet.has(obj as SchoolSlug);
};

export const getSchoolName = (slug: SchoolSlug): SchoolName => {
  switch (slug) {
    case 'design':
      return 'QC Design School';
    case 'event':
      return 'QC Event School';
    case 'makeup':
      return 'QC Makeup Academy';
    case 'pet':
      return 'QC Pet Studies';
    case 'wellness':
      return 'QC Wellness Studies';
    case 'writing':
      return 'Winghill Writing School';
  }
};

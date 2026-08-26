import type { SchoolName } from '#src/domain/school.mjs';

export interface Page {
  schoolName: SchoolName;
  accessToken: string;
  formMap: FormMap;
}

type PageMap = Readonly<Record<string, Readonly<Page> | undefined>>;
type FormMap = Readonly<Record<string, bigint[] | undefined>>;

const required = (name: string): string => {
  if (process.env[name]) {
    return process.env[name];
  }
  throw Error(`${name} is required`);
};

export const pageMap: PageMap = {
  26583883957: {
    schoolName: 'QC Design School',
    accessToken: required('FB_PAGE_ACCESS_TOKEN_26583883957'),
    formMap: {},
  },
  313411673642: {
    schoolName: 'QC Event School',
    accessToken: required('FB_PAGE_ACCESS_TOKEN_313411673642'),
    formMap: {
      1764882231136307: [ 32n ],
      // '26567715712868345': { listIds: [ 93 ], smsListIds: [ 80 ], emailTemplateId: 2938 }, // Lisa webinar
    },
  },
  165425206839810: {
    schoolName: 'QC Makeup Academy',
    accessToken: required('FB_PAGE_ACCESS_TOKEN_165425206839810'),
    formMap: {
      // 2712154659184754: { listIds: [ 74 ], smsListIds: [ 81 ], emailTemplateId: 2648 },
    },
  },
  344662312548309: {
    schoolName: 'QC Pet Studies',
    accessToken: required('FB_PAGE_ACCESS_TOKEN_344662312548309'),
    formMap: {},
  },
  // Paw Parent Academy
  507770375746161: {
    schoolName: 'QC Pet Studies',
    accessToken: required('FB_PAGE_ACCESS_TOKEN_507770375746161'),
    formMap: {},
  },
};

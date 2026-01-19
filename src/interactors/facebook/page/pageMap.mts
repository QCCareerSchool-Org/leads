import type { SchoolName } from '#src/domain/school.mjs';

export interface Page {
  schoolName: SchoolName;
  accessToken: string;
  formMap: FormMap;
}

export interface Form {
  listIds: number[];
  smsListIds: number[];
  emailTemplateId?: number;
}

type PageMap = Readonly<Record<string, Readonly<Page> | undefined>>;
type FormMap = Readonly<Record<string, Readonly<Form> | undefined>>;

const required = (name: string): string => {
  if (process.env[name]) {
    return process.env[name];
  }
  throw Error(`${name} is required`);
};

export const pageMap: PageMap = {
  26583883957: {
    schoolName: 'QC Design School',
    accessToken: required('26583883957'),
    formMap: {},
  },
  313411673642: {
    schoolName: 'QC Event School',
    accessToken: required('313411673642'),
    formMap: {
      1764882231136307: { listIds: [ 77 ], smsListIds: [ 79 ], emailTemplateId: 32 },
    },
  },
  165425206839810: {
    schoolName: 'QC Makeup Academy',
    accessToken: required('165425206839810'),
    formMap: {
      2712154659184754: { listIds: [ 74 ], smsListIds: [ 81 ], emailTemplateId: 2648 },
    },
  },
  344662312548309: {
    schoolName: 'QC Pet Studies',
    accessToken: required('344662312548309'),
    formMap: {},
  },
  // Paw Parent Academy
  507770375746161: {
    schoolName: 'QC Pet Studies',
    accessToken: required('507770375746161'),
    formMap: {},
  },
};

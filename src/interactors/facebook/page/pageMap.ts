interface Page {
  accessToken: string;
  formMap: FormMap;
}

interface Form {
  listIds: number[];
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
  313411673642: {
    accessToken: required('313411673642'),
    formMap: {
      1510363700231237: { listIds: [ 77 ], emailTemplateId: 32 },
    },
  },
};

import type { SchoolName } from '#src/domain/school.mjs';

export interface Page {
  schoolName: SchoolName;
  accessToken: string;
  formMap: FormMap;
}

interface CustomField {
  name: string;
  valuesMap: Readonly<Record<string, string>>;
}

interface FormConfig {
  required: bigint[];
  optIn: bigint[];
  nameFieldName: string;
  emailAddressFieldName: string;
  telephoneNumberFieldName: string;
  fieldMap: Readonly<Record<string, CustomField | undefined>>;
}

type PageMap = Readonly<Record<string, Readonly<Page> | undefined>>;
type FormMap = Readonly<Record<string, FormConfig | undefined>>;

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
    formMap: {
      1789752402295461: {
        required: [ 87n ],
        optIn: [ 88n ],
        nameFieldName: 'full_name',
        emailAddressFieldName: 'email',
        telephoneNumberFieldName: 'phone_number',
        fieldMap: {
          'why_are__you_looking_into_interior_decorating?': {
            name: 'questionaire_design_why',
            valuesMap: {
              'I want to get hired by a design firm': 'hired',
              'I want to upskill for my current job': 'upskill',
              'I want to start my own business': 'start business',
              'I\'m not interested in pursuing design & decorating training': 'not interested',
            },
          },
          'when_do_you_want_to_start_your_training?': {
            name: 'questionaire_design_when',
            valuesMap: {
              'As soon as possible': 'soon',
              'In 1-3 months': 'later',
              'Just researching for now': 'just researching',
            },
          },
          'are_you_ready_to_invest_$1800_in_your_training?_(payment_plans_available).': {
            name: 'questionaire_design_ready',
            valuesMap: {
              'Yes': 'yes',
              'I\'d need a payment plan': 'payment plan',
              'That\'s too expensive': 'too expensive',
            },
          },
        },
      },
    },
  },
  313411673642: {
    schoolName: 'QC Event School',
    accessToken: required('FB_PAGE_ACCESS_TOKEN_313411673642'),
    formMap: {
      1061777976661497: {
        required: [ 92n ],
        optIn: [ 91n ],
        nameFieldName: 'first name',
        emailAddressFieldName: 'email',
        telephoneNumberFieldName: 'phone',
        fieldMap: {
          'why_are_you_looking_into_event_planning?': {
            name: 'questionaire_event_why',
            valuesMap: {
              'I want to get hired by an event management firm': 'hired',
              'I want to upskill for my current job': 'upskill',
              'I want to start my own business': 'start business',
              'I\'m not interested in pursuing event planning training': 'not interested',
            },
          },
          'when_do_you_want_to_start_your_training?': {
            name: 'questionaire_event_when',
            valuesMap: {
              'As soon as possible': 'soon',
              'In 1-3 Months': 'later',
              'Just researching for now': 'just researching',
            },
          },
          'are_you_ready_to_invest_$1400_in__your_training?_(payment_plans_available).': {
            name: 'questionaire_event_ready',
            valuesMap: {
              'Yes': 'yes',
              'That\'s too expensive': 'too expensive',
            },
          },
        },
      },
    },
  },
  165425206839810: {
    schoolName: 'QC Makeup Academy',
    accessToken: required('FB_PAGE_ACCESS_TOKEN_165425206839810'),
    formMap: {},
  },
  344662312548309: {
    schoolName: 'QC Pet Studies',
    accessToken: required('FB_PAGE_ACCESS_TOKEN_344662312548309'),
    formMap: {
      1906533187387824: {
        required: [ 90n ],
        optIn: [ 89n ],
        nameFieldName: 'full_name',
        emailAddressFieldName: 'email',
        telephoneNumberFieldName: 'phone_number',
        fieldMap: {
          'why_are_you_looking_into_professional_dog_grooming?': {
            name: 'questionaire_grooming_why',
            valuesMap: {
              'I want to get hired as a groomer': 'hired',
              'I want to upskill for my current job': 'upskill',
              'I want to start my own business': 'start business',
              'I\'m not interested in pursuing pro groomer training': 'not interested',
            },
          },
          'when_do_you_want_to_start_your_training?': {
            name: 'questionaire_grooming_when',
            valuesMap: {
              'As soon as possible': 'soon',
              'In 1-3 months': 'later',
              'I\'m just researching for now': 'just researching',
            },
          },
          'are_you_ready_to_invest_$2500_in_your_training?_(payment_plans_available).': {
            name: 'questionaire_grooming_ready',
            valuesMap: {
              'Yes': 'yes',
              'I\'d need a payment plan': 'payment plan',
              'That\'s too expensive': 'too expensive',
            },
          },
        },
      },
    },
  },
  // Paw Parent Academy
  507770375746161: {
    schoolName: 'QC Pet Studies',
    accessToken: required('FB_PAGE_ACCESS_TOKEN_507770375746161'),
    formMap: {},
  },
};

import type { SchoolName } from '#src/domain/school.mjs';

export interface Page {
  schoolName: SchoolName;
  accessToken: string;
  formMap: FormMap;
}

interface CustomField {
  /** the ActiveCampaign field id */
  id: number;
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
            id: 89,
            name: 'QUESTIONNAIRE_DESIGN_WHY',
            valuesMap: {
              'i_want_to_get_hired_by_a_design_firm': 'hired',
              'i_want_to_upskill_for_my_current_job': 'upskill',
              'i_want_to_start_my_own_business': 'start business',
              'i\'m_not_interested_in_pursuing_design_&_decorating_training': 'not interested',
            },
          },
          'when_do_you_want_to_start_your_training?': {
            id: 90,
            name: 'QUESTIONNAIRE_DESIGN_WHEN',
            valuesMap: {
              'as_soon_as_possible': 'soon',
              'in_1-3_months': 'later',
              'just_researching_for_now': 'just researching',
            },
          },
          'are_you_ready_to_invest_$1800_in_your_training?_(payment_plans_available).': {
            id: 91,
            name: 'QUESTIONNAIRE_DESIGN_READY',
            valuesMap: {
              'yes': 'yes',
              'i\'d_need_a_payment_plan': 'payment plan',
              'that\'s_too_expensive': 'too expensive',
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
            id: 92,
            name: 'QUESTIONNAIRE_EVENT_WHY',
            valuesMap: {
              'i_want_to_get_hired_by_an_event_management_firm': 'hired',
              'i_want_to_upskill_for_my_current_job': 'upskill',
              'i_want_to_start_my_own_business': 'start business',
              'i\'m_not_interested_in_pursuing_event_planning_training': 'not interested',
            },
          },
          'when_do_you_want_to_start_your_training?': {
            id: 93,
            name: 'QUESTIONNAIRE_EVENT_WHEN',
            valuesMap: {
              'as_soon_as_possible': 'soon',
              'in_1-3_months': 'later',
              'just_researching_for_now': 'just researching',
            },
          },
          'are_you_ready_to_invest_$1400_in__your_training?_(payment_plans_available).': {
            id: 94,
            name: 'QUESTIONNAIRE_EVENT_READY',
            valuesMap: {
              'yes': 'yes',
              'that\'s_too_expensive': 'too expensive',
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
            id: 95,
            name: 'QUESTIONNAIRE_GROOMING_WHY',
            valuesMap: {
              'i_want_to_get_hired_as_a_groomer': 'hired',
              'i_want_to_upskill_for_my_current_job': 'upskill',
              'i_want_to_start_my_own_business': 'start business',
              'i\'m_not_interested_in_pursuing_pro_groomer_training': 'not interested',
            },
          },
          'when_do_you_want_to_start_your_training?': {
            id: 96,
            name: 'QUESTIONNAIRE_GROOMING_WHEN',
            valuesMap: {
              'as_soon_as_possible': 'soon',
              'in_1-3_months': 'later',
              'i\'m_just_researching_for_now': 'just researching',
            },
          },
          'are_you_ready_to_invest_$2500_in_your_training?_(payment_plans_available).': {
            id: 97,
            name: 'QUESTIONNAIRE_GROOMING_READY',
            valuesMap: {
              'yes': 'yes',
              'i\'d_need_a_payment_plan': 'payment plan',
              'that\'s_too_expensive': 'too expensive',
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

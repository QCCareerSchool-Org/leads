/* eslint-disable camelcase */
import type { Leadgen } from './leadgen.mjs';
import { isLeadgen } from './leadgen.mjs';

describe('getLeadgen Method', () => {
  it('should validate a valid payload', () => {
    const leadgen: Leadgen = {
      created_time: '2026-01-19T16:56:14+0000',
      field_data: [
        {
          name: 'why_are_you_looking_into_event_planning?',
          values: [ 'i_want_to_upskill_for_my_current_job' ],
        },
        {
          name: 'when_do_you_want_to_start_your_training?',
          values: [ 'in_1-3_months' ],
        },
        {
          name: 'email',
          values: [ 'jojo.joseph+test4\u0040qccareerschool.com' ],
        },
        {
          name: 'first name',
          values: [ 'Jojo Test4' ],
        },
        {
          name: 'phone',
          values: [ '+15487776969' ],
        },
      ],
      custom_disclaimer_responses: [
        {
          checkbox_key: 'i_agree_to_receive_additional_emails_from_qc,_including_promotions_and_industry_updates._unsubscribe_anytime!',
          is_checked: '1',
        },
        {
          checkbox_key: 'i_agree_to_receive_exclusive_sms_offers_from_qc_event_school._message_frequency_varies._message_&_data_rates_may_apply._reply_stop_to_opt_out._',
          is_checked: '1',
        },
      ],
      id: '1576631140047011',
    };
    const result = isLeadgen(leadgen);
    expect(result).toBe(true);
  });
});

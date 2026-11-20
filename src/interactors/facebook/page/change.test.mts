/* eslint-disable camelcase */
import { failure, success } from 'generic-result-type';

import type { FBChange, FBLeadgenChange } from '#src/domain/facebook/change.mjs';
import type { Leadgen } from '#src/domain/facebook/leadgen.mjs';
import { createContact } from '#src/lib/activecampaign.mjs';
import { fbChange } from './change.mjs';
import { getLeadgen } from './getLeadgen.mjs';
import { store } from './store.mjs';

jest.mock('./getLeadgen.mjs', () => ({
  getLeadgen: jest.fn(),
}));

jest.mock('./store.mjs', () => ({
  store: jest.fn(),
}));

jest.mock('#src/lib/activecampaign.mjs', () => ({
  createContact: jest.fn(),
}));

jest.mock('./pageMap.mjs', () => ({
  pageMap: {
    111: {
      schoolName: 'QC Event School',
      accessToken: 'test-access-token',
      formMap: {
        222: {
          required: [ 1n ],
          optIn: [ 2n ],
          nameFieldName: 'first name',
          emailAddressFieldName: 'email',
          telephoneNumberFieldName: 'phone',
          fieldMap: {
            'why?': {
              id: 89,
              name: 'QUESTIONNAIRE_WHY',
              valuesMap: {
                'I want to get hired': 'hired',
              },
            },
            'ignored?': undefined,
          },
        },
      },
    },
  },
}));

const getLeadgenMock = getLeadgen as jest.MockedFunction<typeof getLeadgen>;
const storeMock = store as jest.MockedFunction<typeof store>;
const createContactMock = createContact as jest.MockedFunction<typeof createContact>;

const createChange = (overrides: Partial<FBLeadgenChange['value']> = {}): FBLeadgenChange => ({
  field: 'leadgen',
  value: {
    leadgen_id: '333',
    page_id: '111',
    form_id: '222',
    created_time: 1763560000,
    ...overrides,
  },
});

const createLeadgen = (overrides: Partial<Leadgen> = {}): Leadgen => ({
  created_time: '2026-11-19T16:56:14+0000',
  id: '333',
  field_data: [
    { name: 'email', values: [ 'test@example.com' ] },
    { name: 'first name', values: [ 'Jane' ] },
    { name: 'phone', values: [ '+15555550123' ] },
    { name: 'why?', values: [ 'I want to get hired' ] },
  ],
  custom_disclaimer_responses: [
    { checkbox_key: 'abc_additional_emails', is_checked: '1' },
    { checkbox_key: 'abc_sms_offers', is_checked: '0' },
  ],
  ...overrides,
});

describe('fbChange', () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.resetAllMocks();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });
    storeMock.mockResolvedValue(success('lead-id'));
    createContactMock.mockResolvedValue(success());
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it('should fail for a change that isn\'t a leadgen change', async () => {
    const change: FBChange = { field: 'feed' };
    const result = await fbChange(change);
    expect(result.success).toBe(false);
    expect(getLeadgenMock).not.toHaveBeenCalled();
  });

  it('should fail if the page isn\'t in the page map', async () => {
    const result = await fbChange(createChange({ page_id: '999' }));
    expect(result.success).toBe(false);
    expect(getLeadgenMock).not.toHaveBeenCalled();
  });

  it('should fail if the form isn\'t in the form map', async () => {
    const result = await fbChange(createChange({ form_id: '999' }));
    expect(result.success).toBe(false);
    expect(getLeadgenMock).not.toHaveBeenCalled();
  });

  it('should fetch the leadgen with the page\'s access token', async () => {
    getLeadgenMock.mockResolvedValue(success(createLeadgen()));
    await fbChange(createChange());
    expect(getLeadgenMock).toHaveBeenCalledWith('333', 'test-access-token');
  });

  it('should return the failure if the leadgen can\'t be fetched', async () => {
    const error = Error('fetch failed');
    getLeadgenMock.mockResolvedValue(failure(error));
    const result = await fbChange(createChange());
    expect(result.success).toBe(false);
    expect(!result.success && result.error).toBe(error);
    expect(storeMock).not.toHaveBeenCalled();
    expect(createContactMock).not.toHaveBeenCalled();
  });

  it('should fail if there is no email address field', async () => {
    getLeadgenMock.mockResolvedValue(success(createLeadgen({
      field_data: [ { name: 'first name', values: [ 'Jane' ] } ],
    })));
    const result = await fbChange(createChange());
    expect(result.success).toBe(false);
    expect(storeMock).not.toHaveBeenCalled();
    expect(createContactMock).not.toHaveBeenCalled();
  });

  it('should fail if the email address field is empty', async () => {
    getLeadgenMock.mockResolvedValue(success(createLeadgen({
      field_data: [ { name: 'email', values: [] } ],
    })));
    const result = await fbChange(createChange());
    expect(result.success).toBe(false);
    expect(storeMock).not.toHaveBeenCalled();
  });

  it('should store the lead and create the contact', async () => {
    const leadgen = createLeadgen();
    getLeadgenMock.mockResolvedValue(success(leadgen));

    const result = await fbChange(createChange());

    expect(result.success).toBe(true);
    expect(storeMock).toHaveBeenCalledTimes(1);
    expect(storeMock).toHaveBeenCalledWith(
      expect.objectContaining({ schoolName: 'QC Event School' }),
      'test@example.com',
      [ leadgen.field_data, leadgen.custom_disclaimer_responses ],
      true,
      false,
      'Jane',
      '+15555550123',
    );
    expect(createContactMock).toHaveBeenCalledTimes(1);
    expect(createContactMock).toHaveBeenCalledWith('test@example.com', true, false, 'QC Event School', 'Jane', undefined, 'US', null, null, '+15555550123', [ 1n ], [ 2n ], 'Meta', undefined, [ { field: 89, value: 'hired' } ]);
  });

  it('should pass an empty custom fields array when no answers can be mapped', async () => {
    getLeadgenMock.mockResolvedValue(success(createLeadgen({
      field_data: [
        { name: 'email', values: [ 'test@example.com' ] },
        { name: 'why?', values: [ 'Something unexpected' ] },
      ],
    })));

    await fbChange(createChange());

    expect(createContactMock.mock.calls[0]?.[14]).toEqual([]);
  });

  it('should store the first email address but create a contact for every email address', async () => {
    getLeadgenMock.mockResolvedValue(success(createLeadgen({
      field_data: [ { name: 'email', values: [ 'one@example.com', 'two@example.com' ] } ],
    })));

    const result = await fbChange(createChange());

    expect(result.success).toBe(true);
    expect(storeMock).toHaveBeenCalledTimes(1);
    expect(storeMock.mock.calls[0]?.[1]).toBe('one@example.com');
    expect(createContactMock).toHaveBeenCalledTimes(2);
    expect(createContactMock.mock.calls[0]?.[0]).toBe('one@example.com');
    expect(createContactMock.mock.calls[1]?.[0]).toBe('two@example.com');
  });

  it('should pass undefined for the name and telephone number when they are missing', async () => {
    getLeadgenMock.mockResolvedValue(success(createLeadgen({
      field_data: [ { name: 'email', values: [ 'test@example.com' ] } ],
    })));

    await fbChange(createChange());

    const storeArgs = storeMock.mock.calls[0];
    expect(storeArgs?.[5]).toBeUndefined();
    expect(storeArgs?.[6]).toBeUndefined();
    const contactArgs = createContactMock.mock.calls[0];
    expect(contactArgs?.[4]).toBeUndefined();
    expect(contactArgs?.[9]).toBeUndefined();
  });

  it.each([
    [ '1', '1', true, true ],
    [ '1', '0', true, false ],
    [ '0', '1', false, true ],
    [ '0', '0', false, false ],
  ])('should read the opt-ins from the disclaimer responses (email %s, sms %s)', async (emailChecked, smsChecked, emailOptIn, smsOptIn) => {
    getLeadgenMock.mockResolvedValue(success(createLeadgen({
      custom_disclaimer_responses: [
        { checkbox_key: 'abc_additional_emails', is_checked: emailChecked },
        { checkbox_key: 'abc_sms_offers', is_checked: smsChecked },
      ],
    })));

    await fbChange(createChange());

    expect(storeMock.mock.calls[0]?.[3]).toBe(emailOptIn);
    expect(storeMock.mock.calls[0]?.[4]).toBe(smsOptIn);
    expect(createContactMock.mock.calls[0]?.[1]).toBe(emailOptIn);
    expect(createContactMock.mock.calls[0]?.[2]).toBe(smsOptIn);
  });

  it('should treat missing disclaimer responses as not opted in', async () => {
    getLeadgenMock.mockResolvedValue(success(createLeadgen({ custom_disclaimer_responses: [] })));

    await fbChange(createChange());

    expect(storeMock.mock.calls[0]?.[3]).toBe(false);
    expect(storeMock.mock.calls[0]?.[4]).toBe(false);
  });

  it('should still create the contact and fail if storing the lead fails', async () => {
    getLeadgenMock.mockResolvedValue(success(createLeadgen()));
    storeMock.mockResolvedValue(failure(Error('database error')));

    const result = await fbChange(createChange());

    expect(result.success).toBe(false);
    expect(!result.success && result.error.message).toBe('database error');
    expect(createContactMock).toHaveBeenCalledTimes(1);
  });

  it('should fail if creating a contact fails', async () => {
    getLeadgenMock.mockResolvedValue(success(createLeadgen()));
    createContactMock.mockResolvedValue(failure(Error('activecampaign error')));

    const result = await fbChange(createChange());

    expect(result.success).toBe(false);
    expect(!result.success && result.error.message).toBe('activecampaign error');
  });

  it('should combine the error messages when several steps fail', async () => {
    getLeadgenMock.mockResolvedValue(success(createLeadgen({
      field_data: [ { name: 'email', values: [ 'one@example.com', 'two@example.com' ] } ],
    })));
    storeMock.mockResolvedValue(failure(Error('database error')));
    createContactMock
      .mockResolvedValueOnce(failure(Error('first contact error')))
      .mockResolvedValueOnce(failure(Error('second contact error')));

    const result = await fbChange(createChange());

    expect(result.success).toBe(false);
    expect(!result.success && result.error.message).toBe('database error\nfirst contact error\nsecond contact error');
  });

  describe('field map checks', () => {
    it('should not log any errors when every field is accounted for', async () => {
      getLeadgenMock.mockResolvedValue(success(createLeadgen()));
      await fbChange(createChange());
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should log an error for a field that isn\'t in the field map', async () => {
      const leadgen = createLeadgen();
      leadgen.field_data.push({ name: 'surprise?', values: [ 'hello' ] });
      getLeadgenMock.mockResolvedValue(success(leadgen));

      const result = await fbChange(createChange());

      expect(result.success).toBe(true);
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('\'surprise?\''));
    });

    it('should not log an error for a field mapped to undefined', async () => {
      const leadgen = createLeadgen();
      leadgen.field_data.push({ name: 'ignored?', values: [ 'whatever' ] });
      getLeadgenMock.mockResolvedValue(success(leadgen));

      await fbChange(createChange());

      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should log an error when a mapped field is missing from the leadgen', async () => {
      getLeadgenMock.mockResolvedValue(success(createLeadgen({
        field_data: [ { name: 'email', values: [ 'test@example.com' ] } ],
      })));

      const result = await fbChange(createChange());

      expect(result.success).toBe(true);
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('doesn\'t have a \'why?\' field'));
    });

    it('should log an error when a mapped field has no values key', async () => {
      getLeadgenMock.mockResolvedValue(success(createLeadgen({
        field_data: [
          { name: 'email', values: [ 'test@example.com' ] },
          { name: 'why?' },
        ],
      })));

      await fbChange(createChange());

      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('doesn\'t have a `values` key'));
    });

    it('should log an error when a mapped field has empty values', async () => {
      getLeadgenMock.mockResolvedValue(success(createLeadgen({
        field_data: [
          { name: 'email', values: [ 'test@example.com' ] },
          { name: 'why?', values: [] },
        ],
      })));

      await fbChange(createChange());

      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('empty `values` value'));
    });

    it('should log the unmatched value when an answer is missing from the valuesMap', async () => {
      getLeadgenMock.mockResolvedValue(success(createLeadgen({
        field_data: [
          { name: 'email', values: [ 'test@example.com' ] },
          { name: 'why?', values: [ 'Something unexpected' ] },
        ],
      })));

      const result = await fbChange(createChange());

      expect(result.success).toBe(true);
      expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('(\'Something unexpected\') is missing from the valuesMap'));
    });
  });
});

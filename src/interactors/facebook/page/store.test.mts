import { failure, success } from 'generic-result-type';

import { storeLead } from '#src/lib/storeLead.mjs';
import type { Page } from './pageMap.mjs';
import { store } from './store.mjs';

jest.mock('#src/lib/storeLead.mjs', () => ({
  storeLead: jest.fn(),
}));

const storeLeadMock = storeLead as jest.MockedFunction<typeof storeLead>;

const page: Page = {
  schoolName: 'QC Pet Studies',
  accessToken: 'test-access-token',
  formMap: {},
};

describe('store', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should build the lead payload and store it', async () => {
    storeLeadMock.mockResolvedValue(success('lead-id'));
    const fields = [ [ { name: 'email', values: [ 'test@example.com' ] } ], [] ];

    const result = await store(page, 'test@example.com', fields, true, false, 'Jane', '+15555550123');

    expect(result.success).toBe(true);
    expect(storeLeadMock).toHaveBeenCalledTimes(1);
    expect(storeLeadMock).toHaveBeenCalledWith({
      ipAddress: '127.0.0.1',
      school: 'QC Pet Studies',
      emailAddress: 'test@example.com',
      firstName: 'Jane',
      lastName: null,
      telephoneNumber: '+15555550123',
      emailOptIn: true,
      smsOptIn: false,
      countryCode: null,
      provinceCode: null,
      city: null,
      referrer: null,
      gclid: null,
      msclkid: null,
      browserName: null,
      browserVersion: null,
      os: null,
      mobile: null,
      fbFields: fields,
    });
  });

  it('should use null for a missing name and telephone number', async () => {
    storeLeadMock.mockResolvedValue(success('lead-id'));

    await store(page, 'test@example.com', [], false, false);

    expect(storeLeadMock).toHaveBeenCalledWith(expect.objectContaining({
      firstName: null,
      telephoneNumber: null,
    }));
  });

  it('should return the storeLead result', async () => {
    const error = Error('database error');
    storeLeadMock.mockResolvedValue(failure(error));

    const result = await store(page, 'test@example.com', [], false, false);

    expect(result.success).toBe(false);
    expect(!result.success && result.error).toBe(error);
  });
});

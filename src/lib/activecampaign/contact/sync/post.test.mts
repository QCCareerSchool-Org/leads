import { postContact } from './post.mjs';
import { activeCampaignFetch } from '../../index.mjs';

jest.mock('../../index.mjs', () => ({
  activeCampaignFetch: jest.fn(),
  isErrorResponse: jest.fn(),
}));

const activeCampaignFetchMock = activeCampaignFetch as jest.MockedFunction<typeof activeCampaignFetch>;

const sentBody = (): unknown => {
  const body = activeCampaignFetchMock.mock.calls[0]?.[1]?.body;
  if (typeof body !== 'string') {
    throw Error('body was not a string');
  }
  return JSON.parse(body);
};

describe('postContact', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    activeCampaignFetchMock.mockResolvedValue(new Response(JSON.stringify({ contact: { id: '123' } }), { status: 201 }));
  });

  it('should send the custom field values after the standard fields', async () => {
    const result = await postContact({ email: 'test@example.com' }, {
      countryCode: 'US',
      city: 'Ottawa',
      custom: [ { field: 89, value: 'hired' }, { field: 90, value: 'soon' } ],
    });

    expect(result.success && result.value).toBe(123n);
    expect(sentBody()).toEqual({
      contact: {
        email: 'test@example.com',
        allowNullEmail: false,
        fieldValues: [
          { field: 2, value: 'US' },
          { field: 4, value: 'Ottawa' },
          { field: 89, value: 'hired' },
          { field: 90, value: 'soon' },
        ],
      },
    });
  });

  it('should send only the standard fields when there are no custom fields', async () => {
    await postContact({ email: 'test@example.com' }, { countryCode: 'US' });

    expect(sentBody()).toEqual({
      contact: {
        email: 'test@example.com',
        allowNullEmail: false,
        fieldValues: [ { field: 2, value: 'US' } ],
      },
    });
  });
});

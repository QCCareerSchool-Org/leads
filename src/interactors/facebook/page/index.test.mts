import { failure, success } from 'generic-result-type';

import type { FBObject } from '#src/domain/facebook/object.mjs';
import { fbChange } from './change.mjs';
import { fbPage } from './index.mjs';

jest.mock('./change.mjs', () => ({
  fbChange: jest.fn(),
}));

const fbChangeMock = fbChange as jest.MockedFunction<typeof fbChange>;

describe('fbPage', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => { /* empty */ });
    jest.spyOn(console, 'error').mockImplementation(() => { /* empty */ });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should fail if the object isn\'t a page', async () => {
    const obj: FBObject = { object: 'user', entry: [] };
    const result = await fbPage(obj);
    expect(result.success).toBe(false);
    expect(fbChangeMock).not.toHaveBeenCalled();
  });

  it('should return zero for a page with no entries', async () => {
    const result = await fbPage({ object: 'page', entry: [] });
    expect(result.success).toBe(true);
    expect(result.success && result.value).toBe(0);
  });

  it('should act on every change in every entry and count the successes', async () => {
    fbChangeMock
      .mockResolvedValueOnce(success())
      .mockResolvedValueOnce(failure(Error('bad change')))
      .mockResolvedValueOnce(success());

    const result = await fbPage({
      object: 'page',
      entry: [
        { id: '1', time: 1, changes: [ { field: 'leadgen' }, { field: 'leadgen' } ] },
        { id: '2', time: 2, changes: [ { field: 'leadgen' } ] },
      ],
    });

    expect(fbChangeMock).toHaveBeenCalledTimes(3);
    expect(result.success).toBe(true);
    expect(result.success && result.value).toBe(2);
  });

  it('should log the error from a failed change', async () => {
    fbChangeMock.mockResolvedValue(failure(Error('bad change')));

    await fbPage({ object: 'page', entry: [ { id: '1', time: 1, changes: [ { field: 'leadgen' } ] } ] });

    expect(console.error).toHaveBeenCalledWith('bad change');
  });
});

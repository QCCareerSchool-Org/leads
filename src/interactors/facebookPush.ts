import type { FBChange } from '../handlers/handleFacebookPush.js';
import type { ResultType } from '../lib/result.js';
import { Result } from '../lib/result.js';

export const facebookAddPush = async (entry: FBChange): Promise<ResultType<string>> => {
  return Result.success(``);
};

export const facebookFetchData = async (entry: FBChange): Promise<ResultType<number>> => {
  return Result.success(0);
};

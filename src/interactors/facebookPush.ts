import type { ResultType } from '../lib/result.js';
import { Result } from '../lib/result.js';

export const faceBookAddPush = async (firstName: string, lastName: string): Promise<ResultType<string>> => {
  return Result.success(`${firstName} ${lastName}`);
};

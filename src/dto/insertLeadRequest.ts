/* eslint-disable import/no-named-as-default-member */
import * as yup from 'yup';

import { Result, ResultType } from '../result';
import { SchoolName, schools } from '../school';

export type InsertLeadRequestDTO = {
  school: SchoolName;
  emailAddress: string;
  firstName: string | null;
  lastName: string | null;
  telephoneNumber: string | null;
  emailOptIn: boolean | null;
  smsOptIn: boolean | null;
  countryCode: string | null;
  provinceCode: string | null;
  testGroup: number | null;
  gclid: string | null;
  msclkid: string | null;
  marketing?: {
    source: string | null;
    medium: string | null;
    campaign: string | null;
    content: string | null;
    term: string | null;
  };
  courses?: string[];
};

const insertLeadRequestSchema: yup.ISchema<InsertLeadRequestDTO> = yup.object({
  school: yup.string().oneOf(schools).defined(),
  emailAddress: yup.string().email().max(255).defined(),
  firstName: yup.string().max(255).nullable().defined(),
  lastName: yup.string().max(255).nullable().defined(),
  telephoneNumber: yup.string().max(255).nullable().defined(),
  emailOptIn: yup.boolean().nullable().defined(),
  smsOptIn: yup.boolean().nullable().defined(),
  countryCode: yup.string().length(2).nullable().defined(),
  provinceCode: yup.string().min(1).max(3).nullable().defined(),
  testGroup: yup.number().min(1).max(12).defined(),
  gclid: yup.string().nullable().defined(),
  msclkid: yup.string().nullable().defined(),
  marketing: yup.object({
    source: yup.string().nullable().defined(),
    medium: yup.string().nullable().defined(),
    campaign: yup.string().nullable().defined(),
    content: yup.string().nullable().defined(),
    term: yup.string().nullable().defined(),
  }),
  courses: yup.array().of(yup.string().defined()),
});

export const validateInsertLeadRequest = async (o: unknown): Promise<ResultType<InsertLeadRequestDTO>> => {
  try {
    const request = await insertLeadRequestSchema.validate(o);
    return Result.success(request);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'invalid request';
    return Result.fail(Error(message));
  }
};

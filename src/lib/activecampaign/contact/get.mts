import type { Result } from 'generic-result-type';
import { failure, success } from 'generic-result-type';
import zod from 'zod';

import { activeCampaignFetch } from '../index.mjs';

interface Contact {
  id: bigint;
  cdate: Date;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  deleted: number;
  anonymized: number;
  contactLists: bigint[];
}

export const getContact = async (id: bigint, signal?: AbortSignal): Promise<Result<Contact>> => {
  try {
    const response = await activeCampaignFetch(`/contacts/${id}`, { signal });

    if (!response.ok) {
      return failure(Error(response.statusText));
    }

    const responseBody = await response.json();

    if (!(typeof responseBody === 'object' && responseBody !== null && 'contact' in responseBody)) {
      return failure(Error('contact key missing'));
    }

    const contact = await schema.parseAsync(responseBody.contact);

    return success(contact);

  } catch (err) {
    if (!signal?.aborted) {
      console.error(err);
    }
    return failure(err instanceof Error ? err : Error(String(err)));
  }
};

const schema: zod.ZodType<Contact> = zod.object({
  id: zod.coerce.bigint(),
  cdate: zod.coerce.date(),
  email: zod.string(),
  phone: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  deleted: zod.coerce.number().int(),
  anonymized: zod.coerce.number().int(),
  contactLists: zod.array(zod.coerce.bigint()),
});

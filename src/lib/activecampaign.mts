import type { Result } from 'generic-result-type';
import { success } from 'generic-result-type';

import type { SchoolName } from '#src/domain/school.mjs';
import { postContact } from './activecampaign/contact/sync/post.mjs';
import { postContactAutomations } from './activecampaign/contactAutomations/post.mjs';
import { ContactListStatus, postContactLists } from './activecampaign/contactLists/post.mjs';
import { postContactTags } from './activecampaign/contactTags/post.mjs';

export const createContact = async (
  emailAddress: string,
  schoolName: SchoolName,
  firstName: string | undefined,
  lastName: string | undefined,
  countryCode: string,
  provinceCode?: string | null,
  city?: string | null,
  telephoneNumber?: string,
  automationId?: bigint,
  source?: Source,
): Promise<Result> => {
  const contact = {
    email: emailAddress,
    firstName: firstName ?? '',
    lastName: lastName ?? '',
    phone: telephoneNumber ?? '',
  };

  const fields = { countryCode, provinceCode: provinceCode ?? undefined, city: city ?? undefined };

  const postContactResult = await postContact(contact, fields);

  if (!postContactResult.success) {
    return postContactResult;
  }

  const contactId = postContactResult.value;

  if (source) {
    const postSourceContactTagsResult = await postContactTags({
      contact: contactId,
      tag: sourceTags[source],
    });

    if (!postSourceContactTagsResult.success) {
      console.error(postSourceContactTagsResult.error);
    }
  }

  if (generalListIds[schoolName]) {
    const postContactListsResult = await postContactLists({
      contact: contactId,
      list: generalListIds[schoolName],
      status: ContactListStatus.ACTIVE,
    });

    if (!postContactListsResult.success) {
      console.error(postContactListsResult.error);
    }
  } else {
    console.error(`List id not specified for ${schoolName}`);
  }

  if (automationId) {
    const postContactAutomationsResult = await postContactAutomations({
      contact: contactId,
      automation: automationId,
    });

    if (!postContactAutomationsResult.success) {
      console.error(postContactAutomationsResult.error);
    }
  } else {
    console.warn(`No automation id set for contact, ${contactId}`);
  }

  return success();
};

const generalListIds: Partial<Record<SchoolName, bigint>> = {
  'QC Design School': 35n,
  'QC Event School': 32n,
  'QC Makeup Academy': 37n,
  'QC Pet Studies': 39n,
  'QC Wellness Studies': 36n,
} as const;

const sourceTags = {
  'Meta': 27n,
  'Course Compare': 28n,
} as const;

type Source = keyof typeof sourceTags;

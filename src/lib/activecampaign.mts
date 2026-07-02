import type { Result } from 'generic-result-type';
import { success } from 'generic-result-type';

import type { SchoolName } from '#src/domain/school.mjs';
import { postContact } from './activecampaign/contact/sync/post.mjs';
import { postContactAutomations } from './activecampaign/contactAutomations/post.mjs';
import { ContactListStatus, postContactLists } from './activecampaign/contactLists/post.mjs';
import { postContactTags } from './activecampaign/contactTags/post.mjs';

export const createContact = async (
  emailAddress: string,
  emailOptIn: boolean,
  smsOptIn: boolean,
  schoolName: SchoolName,
  firstName: string | undefined,
  lastName: string | undefined,
  countryCode: string,
  provinceCode?: string | null,
  city?: string | null,
  telephoneNumber?: string,
  requiredAutomationIds?: bigint[],
  optionalAutomationIds?: bigint[],
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

  // the contact is always added to the email list
  if (emailListIds[schoolName]) {
    const postContactListsResult = await postContactLists({
      contact: contactId,
      list: emailListIds[schoolName],
      status: ContactListStatus.ACTIVE,
    });

    if (!postContactListsResult.success) {
      console.error(postContactListsResult.error);
    }
  } else {
    console.error(`Email list id not specified for ${schoolName}`);
  }

  if (smsOptIn) {
    // if the contact opts in, add them to the sms list for this school
    if (smsListIds[schoolName]) {
      const postContactListsResult = await postContactLists({
        contact: contactId,
        list: smsListIds[schoolName],
        status: ContactListStatus.ACTIVE,
      });

      if (!postContactListsResult.success) {
        console.error(postContactListsResult.error);
      }
    } else {
      console.error(`SMS list id not specified for ${schoolName}`);
    }
  }

  // these are the automations that fullfill the forms stated purpose (e.g., send the brochure email)
  if (requiredAutomationIds) {
    for (const automationId of requiredAutomationIds) {
      const postContactAutomationsResult = await postContactAutomations({
        contact: contactId,
        automation: automationId,
      });

      if (!postContactAutomationsResult.success) {
        console.error(postContactAutomationsResult.error);
      }
    }
  }

  if (emailOptIn) {
    // these are the automations that the contact can opt into (e.g., join the mailing list)
    if (optionalAutomationIds) {
      for (const automationId of optionalAutomationIds) {
        const postContactAutomationsResult = await postContactAutomations({
          contact: contactId,
          automation: automationId,
        });

        if (!postContactAutomationsResult.success) {
          console.error(postContactAutomationsResult.error);
        }
      }
    } else {
      console.warn(`No optional automation ids found for contact, ${contactId}`);
    }
  }

  return success();
};

const emailListIds: Partial<Record<SchoolName, bigint>> = {
  'QC Design School': 35n,
  'QC Event School': 32n,
  'QC Makeup Academy': 37n,
  'QC Pet Studies': 39n,
  'QC Wellness Studies': 36n,
} as const;

const smsListIds: Partial<Record<SchoolName, bigint>> = {
  'QC Design School': 34n,
  'QC Event School': 33n,
  'QC Makeup Academy': 38n,
} as const;

const sourceTags = {
  'Meta': 27n,
  'Course Compare': 28n,
} as const;

type Source = keyof typeof sourceTags;

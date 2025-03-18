import fetch from 'node-fetch';

import { SchoolName } from './domain/school';
import { logError } from './logger';

const endpoints: Record<SchoolName, string | undefined> = {
  'QC Design School': 'https://api.provesrc.com/webhooks/track/b27a08522e34541a7f7442bf4c22e0e0',
  'QC Event School': undefined,
  'QC Makeup Academy': undefined,
  'QC Pet Studies': undefined,
  'QC Wellness Studies': undefined,
  'Winghill Writing School': undefined,
};

export const addProvesrcLead = async (schoolName: SchoolName, emailAddress: string | undefined, firstName: string | undefined, ipAddress: string | null): Promise<void> => {
  const url = endpoints[schoolName];
  if (!url) {
    return;
  }

  const payload: Payload = {
    email: emailAddress,
    ip: ipAddress ?? undefined,
    firstName: firstName,
  };

  await sendRequest(payload, url);
};

type Payload = {
  email?: string;
  ip?: string;
  firstName?: string;
  lastName?: string;
  guid?: string;
  timestamp?: number;
};

const sendRequest = async (payload: Payload, url: string): Promise<void> => {
  try {
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw Error(response.statusText);
    }

    await response.json();
  } catch (err) {
    logError('Unable to send request', err instanceof Error ? err.message : err);
  }
};

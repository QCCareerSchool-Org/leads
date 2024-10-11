import fetch from 'node-fetch';

import { SchoolName } from './domain/school';
import { logError } from './logger';

const zapierEndpoints: Record<SchoolName, string | undefined> = {
  'QC Design School': 'https://hooks.zapier.com/hooks/catch/1909320/35z5cnc',
  'QC Event School': 'https://hooks.zapier.com/hooks/catch/1909320/35clg2t',
  'QC Makeup Academy': 'https://hooks.zapier.com/hooks/catch/1909320/358extf',
  'QC Pet Studies': 'https://hooks.zapier.com/hooks/catch/1909320/213k723',
  'QC Wellness Studies': undefined,
  'Winghill Writing School': undefined,
};

export const addTrustPulseLead = async (schoolName: SchoolName, emailAddress: string | undefined, firstName: string | undefined, ipAddress: string | null): Promise<void> => {
  const url = zapierEndpoints[schoolName];
  if (!url) {
    return;
  }

  const payload: Payload = {
    emailAddress: emailAddress ?? null,
    firstName: firstName ?? null,
    postalCode: null,
    ipAddress,
  };

  await sendZap(payload, url);
};

type Payload = {
  emailAddress: string | null;
  firstName: string | null;
  postalCode: string | null;
  ipAddress: string | null;
};

const sendZap = async (payload: Payload, url: string): Promise<void> => {
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
    logError('Unable to send zap', err instanceof Error ? err.message : err);
  }
};

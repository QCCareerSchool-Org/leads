import { SchoolName } from './school';

export const getContactURL = (school?: SchoolName): string => {
  switch (school) {
    case 'QC Design School':
      return 'https://www.qcdesignschool.com/contact-us';
    case 'QC Event School':
      return 'https://www.qceventplanning.com/contact-us';
    case 'QC Makeup Academy':
      return 'https://www.qcmakeupacademy.com/contact-us';
    case 'QC Pet Studies':
      return 'https://www.qcpetstudies.com/contact-us';
    case 'QC Wellness Studies':
      return 'https://www.qcwellnessstudies.com/contact';
    case 'Winghill Writing School':
      return 'https://www.winghill.com/contact-us';
  }
  return 'https://www.qccareerschool.com/contact';
};

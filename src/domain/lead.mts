export interface Lead {
  leadId: string;
  emailAddress: string;
  telephoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  countryCode: string | null;
  provinceCode: string | null;
}

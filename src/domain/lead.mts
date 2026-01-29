export interface Lead {
  leadId: string;
  emailAddress: string;
  telephoneNumber: string | null;
  firstName: string | null;
  lastName: string | null;
  city: string | null;
  countryCode: string | null;
  provinceCode: string | null;
  ip: string | null;
  /** milliseconds since midnight, January 1, 1970 UTC. */
  created: number;
}

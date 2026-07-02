import { createContact } from '#src/lib/activecampaign.mjs';

const contactResult = await createContact('joanne@qccareerschool.com', 'QC Event School', 'Joanne', 'Pendon', 'CA', 'ON', 'Ottawa', '', 32n, 'Course Compare');
if (!contactResult.success) {
  console.log(contactResult.error);
}

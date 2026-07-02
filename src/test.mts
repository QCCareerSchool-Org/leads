import { createContact } from '#src/lib/activecampaign.mjs';

const contactResult = await createContact('joanne@qccareerschool.com', true, true, 'QC Event School', 'Joanne', 'Pendon', 'CA', 'ON', 'Ottawa', '6137498248', [ 32n ], [ 25n ], 'Course Compare');
if (!contactResult.success) {
  console.log(contactResult.error);
}

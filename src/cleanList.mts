import { createReadStream } from 'node:fs';
import { createInterface } from 'node:readline';

import { deleteContact } from './lib/activecampaign/contact/delete.mjs';
import { getContactByEmailAddress } from './lib/activecampaign/contact/get.mjs';
import { delay } from './lib/delay.mjs';

async function *readLines(filePath: string | URL): AsyncGenerator<string, void, void> {
  const fileStream = createReadStream(filePath, { encoding: 'utf8' });
  const lines = createInterface({ input: fileStream, crlfDelay: Infinity });

  try {
    for await (const line of lines) {
      yield line;
    }
  } finally {
    lines.close();
    fileStream.destroy();
  }
}

const emailAddresses = readLines('./toDelete3.csv');

for await (const emailAddress of emailAddresses) {
  const trimmedValue = emailAddress.trim();
  if (!trimmedValue) {
    continue;
  }

  const contactResult = await getContactByEmailAddress(trimmedValue);

  if (contactResult.success) {
    const contact = contactResult.value;

    if (contact.contactLists?.length) {
      console.log(`${trimmedValue} is in a list!`);
      break;
    }

    console.log(`deleting ${trimmedValue}...`);

    await deleteContact(contactResult.value.id);

    // await delay(100);
  } else {
    console.error(contactResult.error);
    break;
  }
}

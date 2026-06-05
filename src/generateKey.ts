import { createHash, randomBytes } from 'node:crypto';

const key = randomBytes(32).toString('base64url');
const hash = createHash('sha256').update(key).digest('hex');

console.log('key (base64url)', key);
console.log('hash (hex)', hash);

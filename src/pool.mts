import 'dotenv/config';
import { attachDatabasePool } from '@vercel/functions';
import type { PoolOptions } from 'mysql2';
import { createPool } from 'mysql2';
import fs from 'node:fs';
import path from 'node:path';

if (!process.env.DB_GENERAL_USER) {
  throw Error('DB_GENERAL_USER missing');
}

if (!process.env.DB_GENERAL_PASSWORD) {
  throw Error('DB_GENERAL_PASSWORD missing');
}

const config: PoolOptions = {
  user: process.env.DB_GENERAL_USER,
  password: process.env.DB_GENERAL_PASSWORD,
  host: '35.192.24.2',
  port: 3306,
  database: 'leads',
  ssl: {
    ca: fs.readFileSync(path.resolve('./mysql-ca.pem')),
    verifyIdentity: false,
  },
  idleTimeout: 5000, // five seconds as per https://vercel.com/kb/guide/connection-pooling-with-functions
  maxIdle: 0, // how many connections to keep regardless of the timeout
};

const rawPool = createPool(config);

if (process.env.NODE_ENV === 'production') {
  attachDatabasePool(rawPool);
}

export const pool = rawPool.promise();

export async function closePool(): Promise<void> {
  await rawPool.promise().end();
};

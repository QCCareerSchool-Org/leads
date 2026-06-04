import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

import { PrismaClient } from '../prisma/generated/general/index.js';

if (!process.env.DB_GENERAL_USER) {
  throw Error('DB_GENERAL_USER missing');
}

if (!process.env.DB_GENERAL_PASSWORD) {
  throw Error('DB_GENERAL_PASSWORD missing');
}

const adapter = new PrismaMariaDb({
  user: process.env.DB_GENERAL_USER,
  password: process.env.DB_GENERAL_PASSWORD,
  host: '35.192.24.2',
  port: 3306,
  database: 'leads',
  ssl: {
    rejectUnauthorized: false,
  },
  connectionLimit: 2,
});

export const prismaGeneral = new PrismaClient({ adapter });

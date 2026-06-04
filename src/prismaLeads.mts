import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

import { PrismaClient } from '../prisma/generated/leads/index.js';

if (!process.env.DB_LEADS_USER) {
  throw Error('DB_LEADS_USER missing');
}

if (!process.env.DB_LEADS_PASSWORD) {
  throw Error('DB_LEADS_PASSWORD missing');
}

const adapter = new PrismaMariaDb({
  user: process.env.DB_LEADS_USER,
  password: process.env.DB_LEADS_PASSWORD,
  host: '35.192.24.2',
  port: 3306,
  database: 'leads',
  ssl: {
    rejectUnauthorized: false,
  },

  connectionLimit: 2,
});

export const prismaLeads = new PrismaClient({ adapter });

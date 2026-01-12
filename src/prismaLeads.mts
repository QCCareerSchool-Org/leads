import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

import { PrismaClient } from '../prisma/generated/leads/index.js';

const connectionString = `${process.env.LEADS_DATABASE_URL}`;

const adapter = new PrismaMariaDb(connectionString);
export const prismaLeads = new PrismaClient({ adapter });

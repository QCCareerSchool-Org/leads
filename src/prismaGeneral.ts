import 'dotenv/config';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

import { PrismaClient } from '../prisma/generated/general/index.js';

const connectionString = `${process.env.GENERAL_DATABASE_URL}`;

const adapter = new PrismaMariaDb(connectionString);
export const prismaGeneral = new PrismaClient({ adapter });

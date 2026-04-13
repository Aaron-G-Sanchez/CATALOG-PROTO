import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/primsa/client'

const DB_CONN_STRING = process.env.DB_CONN_STRING

const adapter = new PrismaPg({
  connectionString: `postgres://${DB_CONN_STRING}`,
})

export const prisma = new PrismaClient({ adapter })

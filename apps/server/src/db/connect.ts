import 'dotenv/config'
import { Sequelize } from 'sequelize'

const DB_CONN_STRING = process.env.DB_CONN_STRING

if (!DB_CONN_STRING) throw new Error('No DB connection string')

export const db = new Sequelize(`postgres://${DB_CONN_STRING}`)

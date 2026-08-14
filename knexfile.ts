import type { Knex } from 'knex'
import { env } from './src/env/index.ts'

const config: Knex.Config = {
 client: env.DATABASE_CLIENT,
 connection: env.DATABASE_CLIENT === 'sqlite3' ? {
 filename: env.DATABASE_URL
  } : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './database/migrations',
  },
}
export default config 
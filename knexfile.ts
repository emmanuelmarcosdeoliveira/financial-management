import type { Knex } from 'knex'
import { env } from './src/env/env.ts'


const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: env.DATABASE_URL
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './database/migrations',
  },
}
export default config 
import type { Knex } from 'knex'

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './database/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    directory: './database/migrations',
  },
}
export default config
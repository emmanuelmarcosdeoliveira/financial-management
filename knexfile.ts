import type { Knex } from 'knex'

const config: Knex.Config = {
  client: 'sqlite3',
  connection: {
    filename: './src/database/app.db',
  },
  useNullAsDefault: true,
  migrations: {
    directory: './src/database/migrations',
  },
}
export default config
import Knex from 'knex'

export const database  =  Knex({
  client: 'sqlite3', 
  connection: {
    filename: './src/tmp/app.db'
  }, 
  useNullAsDefault: true,
})
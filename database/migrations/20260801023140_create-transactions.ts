// eslint-disable-next-line semi
import type { Knex } from 'knex';


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('transactions', (table) => {
    table.uuid('id').primary()
    table.text('title').notNullable()
    table.decimal('price', 10 ,2).notNullable()
    table.text('category').notNullable()
    table.text('type').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    
  })
}


export async function down(knex: Knex): Promise<void> {
  await  knex.schema.dropTable('transactions')
}


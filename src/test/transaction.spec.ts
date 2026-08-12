import request from 'supertest'
import {server} from '../app.ts'
import {  it, beforeAll, afterAll, describe, expect, beforeEach} from 'vitest'
import { execSync } from 'node:child_process'

describe('Transactions routes', () => {
beforeAll( async  ( ) => {
await server.ready()
}) 
afterAll( async  ( ) => {
  await server.close()
})

beforeEach(() => {
  execSync('pnpm knex migrate:rollback --all')
  execSync('pnpm knex migrate:latest')
})
it('should be able to create a new transaction', async  ()  => {
   await request(server.server).post('/api/transactions').send({
    title: 'Criação App Mobile',
    price: 3500,
    type: 'income', 
    category: 'Vendas'
  })
  .expect(201)
})
it('should be able to list all transactions', async  ()  => {
  const createTransactionResponse = await request(server.server)
  .post('/api/transactions').send({
    title: 'Criação App Desktop',
    price: 8000,
    type: 'income', 
    category: 'Vendas'
  })
  const cookies = createTransactionResponse.get('Set-Cookie')

  const listTransactionsResponse = await request(server.server)
   .get('/api/transactions')
   .set('Cookie', cookies!)
   .expect(200)

  expect(listTransactionsResponse.body.transactions).toEqual([
    expect.objectContaining({
      title: 'Criação App Desktop',
      price: 8000,
      type: 'income', 
      category: 'Vendas'
    })
  ])
})
})
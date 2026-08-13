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



it('should be able to get a specific transaction', async  ()  => {
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

  const transactionsId = listTransactionsResponse.body.transactions[0].id


  const getTransactionsResponse = await request(server.server)
   .get(`/api/transactions/${transactionsId}`)
   .set('Cookie', cookies!)
   .expect(200)
   

  expect(getTransactionsResponse.body.transaction).toEqual(
    expect.objectContaining({
      title: 'Criação App Desktop',
      price: 8000,
      type: 'income', 
      category: 'Vendas'
    })
  )
})


it('should be able to get a summary', async  ()  => {
  const createTransactionResponse = await request(server.server)
  .post('/api/transactions').send({
    title: 'Criação App Desktop',
    price: 8000,
    type: 'income', 
    category: 'Vendas'
  })
  const cookies = createTransactionResponse.get('Set-Cookie')

  await request(server.server)
  .post('/api/transactions')
  .set('Cookie', cookies!)
  .send({
    title: 'Criação  Dashboard',
    price: 2000,
    type: 'income', 
    category: 'Vendas'
  })
    const summaryResponse = await request(server.server)
   .get('/api/summary')
   .set('Cookie', cookies!)
   .expect(200)

  expect(summaryResponse.body.summary).toEqual({
    amount: 10000
})
})
})
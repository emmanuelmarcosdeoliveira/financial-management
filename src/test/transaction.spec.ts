import request from 'supertest'
import {server} from '../app.ts'
import {  it, beforeAll, afterAll, describe} from 'vitest'


describe('Transactions routes', () => {
beforeAll( async  ( ) => {
await server.ready()
}) 

afterAll( async  ( ) => {
  await server.close()
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
})
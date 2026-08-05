import { FastifyInstance } from 'fastify'
import { db } from '../../database.ts'

export async  function transactionRoutes(server: FastifyInstance) {

server.get('/transactions', async () => {
  const transaction = await db('transactions').select('*') 
  return transaction
})
}
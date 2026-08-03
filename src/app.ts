import { fastify } from 'fastify'
import { db } from '../database.ts'


const server = fastify()
server.get('/transactions', async () => {
  const transaction = await db('transactions').select('*') 
  return transaction
})
export default server

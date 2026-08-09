import { FastifyInstance } from 'fastify'
import crypto from 'node:crypto'
import { z } from 'zod'
import { db } from '../../database.ts'

export async  function transactionRoutes(server: FastifyInstance) {
// listas as transações
  server.get('/transactions', async () => {
    const transactions  =  await db('transactions').select()
    return {
      transactions
    }
  })
// listar transações por id
  server.get( '/transactions/:id', async (request, reply) => {
    const getTransactionParamsSchema = z.object({
      id: z.string()
    })
    const { id } = getTransactionParamsSchema.parse(request.params)
    const transaction = await db('transactions').where({ id }).first()
    if(!transaction) {
     return reply.status(404).send({ message: 'Transaction not found' })
    }
    return {
      transaction
    }
  })


// Criar uma nova transação 
server.post('/transactions', async (request, reply) => {
const transactionBodySchema =  z.object({
   title: z.string(),
  price: z.number(),
  type: z.enum(['income', 'outcome']),
  category: z.string(),
  createdAt: z.coerce.date().default(() => new Date())
})
const { title, price, type, category, createdAt}  = transactionBodySchema.parse(request.body)  

// utilizando cookie
let sessionId = request.cookies.sessionId
if(!sessionId) {
  sessionId = crypto.randomUUID()
  reply.cookie('sessionId', sessionId, {
    path: '/', maxAge:  60 * 60 * 24 * 7 // estamos salvando o cookie por 7 dias
  })
}

 await db('transactions').insert({
  id: crypto.randomUUID(),
  title, 
  price, 
  type: type === 'income' ? 'income' : 'outcome',
  category,
  created_at: createdAt, 
  session_id: sessionId
 })
return reply.status(201).send()
})

  // Visualizar o resumo das transações
  server.get('/summary',  async () => {
    const summary = await db('transactions')
    .sum('price', { as: 'amount' })
    .first()
    return {
      summary
    }
  })
}

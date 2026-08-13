import { FastifyInstance } from 'fastify'
import crypto from 'node:crypto'
import { z } from 'zod'
import { db } from '../../database.ts'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists.ts'

export async  function transactionRoutes(server: FastifyInstance) {

// listas as transações
  server.get('/transactions', {preHandler: [checkSessionIdExists],},  async (request, ) => {
  const  {sessionId} = request.cookies 
  
    const transactions  =  await db('transactions')
    .where('session_id', sessionId)
    .select()
    return {
      transactions
    }
  })
// listar transações por id
  server.get( '/transactions/:id',  {preHandler: [checkSessionIdExists],}, async (request, reply) => {
    const getTransactionParamsSchema = z.object({
      id: z.string()
    })
    const { id } = getTransactionParamsSchema.parse(request.params)
    const {sessionId}  = request.cookies
    const transaction = await db('transactions')
    .where({
      session_id: sessionId, 
      id:id 
    })  
    .first()
    if(!transaction) {
     return reply.status(404).send({ message: 'Transaction not found' })
    }
    return {
      transaction
    }
  })
// Criar uma nova transação 
server.post('/transactions',  async (request, reply) => {
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
  reply.setCookie('sessionId', sessionId, {
    path: '/', maxAge:  60 * 60 * 24 * 7 // estamos salvando o cookie por 7 dias
  })
}

 await db('transactions',).insert({
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
  server.get('/summary',   {preHandler: [checkSessionIdExists],}, async (request) => {
    const {sessionId} = request.cookies
    const summary = await db('transactions')
    .where('session_id', sessionId)
    .sum('price', { as: 'amount' })
    .first()
    return {
      summary
    }
  })
}

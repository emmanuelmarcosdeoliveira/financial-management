import { fastify } from 'fastify'
import { transactionRoutes } from './routes/transaction.ts'


const server = fastify()

server.register(transactionRoutes, { prefix: '/api' })

export default server

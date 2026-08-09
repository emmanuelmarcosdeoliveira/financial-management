import { fastify } from 'fastify'
import { transactionRoutes } from './routes/transaction.ts'
import cookie from '@fastify/cookie'

const server = fastify()

server.register(cookie)
server.register(transactionRoutes, { prefix: '/api' })

export default server

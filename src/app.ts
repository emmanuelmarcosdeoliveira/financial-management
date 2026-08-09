import { fastify } from 'fastify'
import { transactionRoutes } from './routes/transaction.ts'
import cookie from '@fastify/cookie'


const server = fastify()

server.register(cookie)
// exemplo de middleware para todas as requisições
server.addHook('preHandler', async (request ) => {
  console.log(`[${request.method}] ${request.url}`)
})

server.get('/api/health', async () => {
  return { message: 'status: ok' }
})

server.register(transactionRoutes, { prefix: '/api' })

export default server

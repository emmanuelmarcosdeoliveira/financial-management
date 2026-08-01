import { fastify } from 'fastify'



const server = fastify()

server.get('/hello', async (_request, reply) => {
  return reply.send('Ola')
})

export default server

import { fastify } from 'fastify'
import { database } from './database.ts'


const server = fastify()

server.get('/hello', async () => {
  //return reply.send('Ola')
  
   const tables  = await database('sqlite_schema').select('*')
   return tables
})

export default server

import server from './app.ts'
import { env } from './env/env.ts'

server.listen( {port: env.PORT} ).then(() => {
  console.log(`🔥Server is running in http://localhost:${env.PORT}`)
})

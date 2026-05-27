import { app } from './app.js'
import { assertDatabaseConnection } from './config/db.js'
import { env } from './config/env.js'

async function bootstrap() {
  await assertDatabaseConnection()

  app.listen(env.port, () => {
    console.log(`HiddenGem API listening on port ${env.port}`)
  })
}

bootstrap().catch((error) => {
  console.error('Failed to start API server', error)
  process.exit(1)
})

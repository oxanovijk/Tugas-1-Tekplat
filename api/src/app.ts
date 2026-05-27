import express from 'express'
import cors from 'cors'
import { env } from './config/env.js'
import { adminRouter } from './routes/admin.js'
import { authRouter } from './routes/auth.js'
import { destinationsRouter } from './routes/destinations.js'
import { externalRouter } from './routes/external.js'
import { packagesRouter } from './routes/packages.js'
import { requestsRouter } from './routes/requests.js'
import { errorHandler } from './middleware/errorHandler.js'

const allowedOrigins = env.appOrigin === '*' ? true : env.appOrigin.split(',').map((origin) => origin.trim())

export const app = express()

app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(env.publicUploadBaseUrl, express.static(env.uploadDir))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'hiddengem-api' })
})

app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/destinations', destinationsRouter)
app.use('/api/packages', packagesRouter)
app.use('/api/requests', requestsRouter)
app.use('/api/external', externalRouter)

app.use(errorHandler)

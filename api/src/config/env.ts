import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: Number(process.env.PORT ?? 3001),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  appOrigin: process.env.APP_ORIGIN ?? 'http://localhost:5173',
  db: {
    host: process.env.DB_HOST ?? '127.0.0.1',
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? 'hiddengem_user',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? 'hiddengem_db',
  },
  jwtSecret: process.env.JWT_SECRET ?? 'dev-only-change-this-secret',
  uploadDir: process.env.UPLOAD_DIR ?? './uploads',
  publicUploadBaseUrl: process.env.PUBLIC_UPLOAD_BASE_URL ?? '/uploads',
}

if (env.nodeEnv === 'production' && env.jwtSecret === 'dev-only-change-this-secret') {
  throw new Error('JWT_SECRET must be configured in production')
}

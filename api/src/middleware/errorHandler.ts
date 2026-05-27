import type { ErrorRequestHandler } from 'express'
import { HttpError } from '../utils/httpError.js'

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  void _next

  if (error instanceof HttpError) {
    res.status(error.status).json({ message: error.message })
    return
  }

  if (error instanceof Error && error.name === 'JsonWebTokenError') {
    res.status(401).json({ message: 'Invalid token' })
    return
  }

  if (error instanceof Error && error.name === 'TokenExpiredError') {
    res.status(401).json({ message: 'Token expired' })
    return
  }

  console.error(error)
  res.status(500).json({ message: 'Internal server error' })
}

import bcrypt from 'bcryptjs'
import { Router } from 'express'
import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import { pool } from '../config/db.js'
import { authenticate, type AuthenticatedRequest } from '../middleware/auth.js'
import { badRequest, forbidden, unauthorized } from '../utils/httpError.js'
import { signUserToken } from '../utils/jwt.js'
import type { AuthUser, UserRole } from '../types/auth.js'

export const authRouter = Router()

type UserRow = RowDataPacket & {
  id: number
  name: string
  email: string
  password_hash: string
  role: UserRole
  approval_status: AuthUser['approvalStatus']
}

function mapUser(row: Omit<UserRow, 'password_hash'>): AuthUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    approvalStatus: row.approval_status,
  }
}

function requireString(value: unknown, field: string) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw badRequest(`${field} is required`)
  }

  return value.trim()
}

function validateEmail(email: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw badRequest('Email format is invalid')
  }
}

authRouter.post('/register', async (req, res, next) => {
  try {
    const name = requireString(req.body.name, 'Name')
    const email = requireString(req.body.email, 'Email').toLowerCase()
    const password = requireString(req.body.password, 'Password')
    const role = requireString(req.body.role, 'Role') as UserRole

    validateEmail(email)

    if (!['provider', 'tourist'].includes(role)) {
      throw badRequest('Registration only supports provider and tourist roles')
    }

    if (password.length < 8) {
      throw badRequest('Password must contain at least 8 characters')
    }

    const [existing] = await pool.query<UserRow[]>('SELECT id FROM users WHERE email = ? LIMIT 1', [email])
    if (existing.length > 0) {
      throw badRequest('Email is already registered')
    }

    const approvalStatus = role === 'provider' ? 'pending' : 'approved'
    const passwordHash = await bcrypt.hash(password, 12)
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO users (name, email, password_hash, role, approval_status)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, passwordHash, role, approvalStatus],
    )

    const user: AuthUser = {
      id: result.insertId,
      name,
      email,
      role,
      approvalStatus,
    }

    res.status(201).json({
      user,
      token: signUserToken(user),
    })
  } catch (error) {
    next(error)
  }
})

authRouter.post('/login', async (req, res, next) => {
  try {
    const email = requireString(req.body.email, 'Email').toLowerCase()
    const password = requireString(req.body.password, 'Password')

    const [rows] = await pool.query<UserRow[]>(
      `SELECT id, name, email, password_hash, role, approval_status
       FROM users
       WHERE email = ?
       LIMIT 1`,
      [email],
    )

    const row = rows[0]
    if (!row) {
      throw unauthorized('Email or password is invalid')
    }

    const isValid = await bcrypt.compare(password, row.password_hash)
    if (!isValid) {
      throw unauthorized('Email or password is invalid')
    }

    if (row.approval_status === 'rejected') {
      throw forbidden('Account registration has been rejected')
    }

    const user = mapUser(row)
    res.json({
      user,
      token: signUserToken(user),
    })
  } catch (error) {
    next(error)
  }
})

authRouter.get('/me', authenticate, (req, res) => {
  res.json({ user: (req as AuthenticatedRequest).user })
})

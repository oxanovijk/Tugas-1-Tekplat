import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import type { RowDataPacket } from 'mysql2'
import { pool } from '../config/db.js'
import { env } from '../config/env.js'
import { unauthorized } from '../utils/httpError.js'
import type { AuthUser, JwtPayload } from '../types/auth.js'

export type AuthenticatedRequest = Request & {
  user: AuthUser
}

type UserRow = RowDataPacket & {
  id: number
  name: string
  email: string
  role: AuthUser['role']
  approval_status: AuthUser['approvalStatus']
}

function mapUser(row: UserRow): AuthUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    approvalStatus: row.approval_status,
  }
}

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  try {
    const authorization = req.header('authorization')
    const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : null

    if (!token) {
      throw unauthorized()
    }

    const payload = jwt.verify(token, env.jwtSecret) as unknown as JwtPayload
    const [rows] = await pool.query<UserRow[]>(
      'SELECT id, name, email, role, approval_status FROM users WHERE id = ? LIMIT 1',
      [payload.sub],
    )

    const user = rows[0]
    if (!user) {
      throw unauthorized('User not found')
    }

    ;(req as AuthenticatedRequest).user = mapUser(user)
    next()
  } catch (error) {
    next(error)
  }
}

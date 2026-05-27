import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import type { AuthUser } from '../types/auth.js'

export function signUserToken(user: Pick<AuthUser, 'id' | 'role'>) {
  return jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, {
    expiresIn: '8h',
  })
}

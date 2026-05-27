import type { NextFunction, Request, Response } from 'express'
import type { UserRole } from '../types/auth.js'
import { forbidden } from '../utils/httpError.js'
import type { AuthenticatedRequest } from './auth.js'

export function requireRole(...roles: UserRole[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const user = (req as AuthenticatedRequest).user

    if (!user || !roles.includes(user.role)) {
      next(forbidden('Role is not allowed to access this resource'))
      return
    }

    next()
  }
}

export function requireApprovedProvider(req: Request, _res: Response, next: NextFunction) {
  const user = (req as AuthenticatedRequest).user

  if (!user || user.role !== 'provider') {
    next(forbidden('Only providers can access this resource'))
    return
  }

  if (user.approvalStatus !== 'approved') {
    next(forbidden('Provider account must be approved by superadmin first'))
    return
  }

  next()
}

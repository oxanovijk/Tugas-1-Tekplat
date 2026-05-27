import { Router } from 'express'
import type { ResultSetHeader } from 'mysql2'
import { pool } from '../config/db.js'
import { authenticate } from '../middleware/auth.js'
import { requireRole } from '../middleware/requireRole.js'
import { badRequest, notFound } from '../utils/httpError.js'

export const adminRouter = Router()

adminRouter.use(authenticate, requireRole('superadmin'))

adminRouter.get('/users', async (_req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, email, role, approval_status AS approvalStatus, created_at AS createdAt
       FROM users
       ORDER BY created_at DESC`,
    )

    res.json({ users: rows })
  } catch (error) {
    next(error)
  }
})

adminRouter.patch('/users/:id/approval', async (req, res, next) => {
  try {
    const userId = Number(req.params.id)
    const status = req.body.status

    if (!Number.isInteger(userId) || userId <= 0) {
      throw badRequest('Invalid user id')
    }

    if (!['approved', 'rejected', 'pending'].includes(status)) {
      throw badRequest('Invalid approval status')
    }

    const [result] = await pool.execute<ResultSetHeader>(
      'UPDATE users SET approval_status = ? WHERE id = ? AND role = "provider"',
      [status, userId],
    )

    if (result.affectedRows === 0) {
      throw notFound('Provider user not found')
    }

    res.json({ message: 'Approval status updated' })
  } catch (error) {
    next(error)
  }
})

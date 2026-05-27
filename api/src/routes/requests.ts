import { Router } from 'express'
import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import { pool } from '../config/db.js'
import { authenticate, type AuthenticatedRequest } from '../middleware/auth.js'
import { requireRole } from '../middleware/requireRole.js'
import { badRequest, forbidden, notFound } from '../utils/httpError.js'

export const requestsRouter = Router()

type RequestRow = RowDataPacket & {
  id: number
  packageId: number
  packageTitle: string
  destinationName: string
  touristId: number
  touristName: string
  providerId: number
  providerName: string
  preferredDate: string
  participantCount: number
  note: string | null
  status: string
  createdAt: string
}

function requestSelect() {
  return `SELECT r.id,
                 r.package_id AS packageId,
                 p.title AS packageTitle,
                 d.name AS destinationName,
                 r.tourist_id AS touristId,
                 tourist.name AS touristName,
                 p.provider_id AS providerId,
                 provider.name AS providerName,
                 r.preferred_date AS preferredDate,
                 r.participant_count AS participantCount,
                 r.note,
                 r.status,
                 r.created_at AS createdAt
          FROM trip_requests r
          JOIN travel_packages p ON p.id = r.package_id
          JOIN destinations d ON d.id = p.destination_id
          JOIN users tourist ON tourist.id = r.tourist_id
          JOIN users provider ON provider.id = p.provider_id`
}

function parsePositiveInteger(value: unknown, field: string) {
  const numberValue = Number(value)
  if (!Number.isInteger(numberValue) || numberValue <= 0) {
    throw badRequest(`${field} must be a positive integer`)
  }

  return numberValue
}

requestsRouter.post('/', authenticate, requireRole('tourist'), async (req, res, next) => {
  try {
    const user = (req as AuthenticatedRequest).user
    const packageId = parsePositiveInteger(req.body.packageId, 'Package')
    const participantCount = parsePositiveInteger(req.body.participantCount, 'Participant count')
    const preferredDate = String(req.body.preferredDate ?? '').trim()
    const note = typeof req.body.note === 'string' ? req.body.note.trim() : null

    if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)) {
      throw badRequest('Preferred date must use YYYY-MM-DD format')
    }

    const [packages] = await pool.query<RowDataPacket[]>(
      'SELECT id, capacity, status FROM travel_packages WHERE id = ? LIMIT 1',
      [packageId],
    )
    const travelPackage = packages[0]
    if (!travelPackage) {
      throw notFound('Package not found')
    }
    if (travelPackage.status !== 'active') {
      throw forbidden('Package is not available')
    }
    if (participantCount > Number(travelPackage.capacity)) {
      throw badRequest('Participant count exceeds package capacity')
    }

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO trip_requests
       (package_id, tourist_id, preferred_date, participant_count, note, status)
       VALUES (?, ?, ?, ?, ?, "pending")`,
      [packageId, user.id, preferredDate, participantCount, note],
    )

    res.status(201).json({ id: result.insertId, message: 'Trip request submitted' })
  } catch (error) {
    next(error)
  }
})

requestsRouter.get('/tourist', authenticate, requireRole('tourist'), async (req, res, next) => {
  try {
    const user = (req as AuthenticatedRequest).user
    const [requests] = await pool.query<RequestRow[]>(
      `${requestSelect()} WHERE r.tourist_id = ? ORDER BY r.created_at DESC`,
      [user.id],
    )

    res.json({ requests })
  } catch (error) {
    next(error)
  }
})

requestsRouter.get('/provider', authenticate, requireRole('provider'), async (req, res, next) => {
  try {
    const user = (req as AuthenticatedRequest).user
    const [requests] = await pool.query<RequestRow[]>(
      `${requestSelect()} WHERE p.provider_id = ? ORDER BY r.created_at DESC`,
      [user.id],
    )

    res.json({ requests })
  } catch (error) {
    next(error)
  }
})

requestsRouter.patch('/:id/status', authenticate, requireRole('provider'), async (req, res, next) => {
  try {
    const user = (req as AuthenticatedRequest).user
    const requestId = parsePositiveInteger(req.params.id, 'Request')
    const status = String(req.body.status ?? '').trim()

    if (!['accepted', 'rejected', 'completed'].includes(status)) {
      throw badRequest('Invalid request status')
    }

    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE trip_requests r
       JOIN travel_packages p ON p.id = r.package_id
       SET r.status = ?
       WHERE r.id = ? AND p.provider_id = ?`,
      [status, requestId, user.id],
    )

    if (result.affectedRows === 0) {
      throw notFound('Trip request not found')
    }

    res.json({ message: 'Trip request status updated' })
  } catch (error) {
    next(error)
  }
})

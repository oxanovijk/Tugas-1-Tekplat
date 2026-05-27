import { Router } from 'express'
import { pool } from '../config/db.js'
import { badRequest, notFound } from '../utils/httpError.js'

export const destinationsRouter = Router()

destinationsRouter.get('/', async (_req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT id, name, city, province, category, short_description AS shortDescription,
              best_time AS bestTime, sustainability_note AS sustainabilityNote,
              image_url AS imageUrl, external_title AS externalTitle
       FROM destinations
       ORDER BY name ASC`,
    )

    res.json({ destinations: rows })
  } catch (error) {
    next(error)
  }
})

destinationsRouter.get('/:id', async (req, res, next) => {
  try {
    const destinationId = Number(req.params.id)

    if (!Number.isInteger(destinationId) || destinationId <= 0) {
      throw badRequest('Invalid destination id')
    }

    const [rows] = await pool.query(
      `SELECT id, name, city, province, category, short_description AS shortDescription,
              best_time AS bestTime, sustainability_note AS sustainabilityNote,
              image_url AS imageUrl, external_title AS externalTitle
       FROM destinations
       WHERE id = ?
       LIMIT 1`,
      [destinationId],
    )

    const destination = Array.isArray(rows) ? rows[0] : null
    if (!destination) {
      throw notFound('Destination not found')
    }

    res.json({ destination })
  } catch (error) {
    next(error)
  }
})

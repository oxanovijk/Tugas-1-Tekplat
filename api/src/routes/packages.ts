import { mkdirSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { Router } from 'express'
import multer from 'multer'
import type { ResultSetHeader, RowDataPacket } from 'mysql2'
import { pool } from '../config/db.js'
import { env } from '../config/env.js'
import { authenticate, type AuthenticatedRequest } from '../middleware/auth.js'
import { requireApprovedProvider, requireRole } from '../middleware/requireRole.js'
import { badRequest, notFound } from '../utils/httpError.js'

export const packagesRouter = Router()

mkdirSync(env.uploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, env.uploadDir)
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase()
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`
    callback(null, safeName)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.mimetype)) {
      callback(badRequest('Only image files are allowed'))
      return
    }

    callback(null, true)
  },
})

type PackageRow = RowDataPacket & {
  id: number
  destinationId: number
  destinationName: string
  city: string
  province: string
  providerId: number
  providerName: string
  title: string
  description: string
  durationDays: number
  estimatedPrice: number
  capacity: number
  status: string
  imageUrl: string | null
  createdAt: string
}

function packageSelect() {
  return `SELECT p.id,
                 p.destination_id AS destinationId,
                 d.name AS destinationName,
                 d.city,
                 d.province,
                 p.provider_id AS providerId,
                 u.name AS providerName,
                 p.title,
                 p.description,
                 p.duration_days AS durationDays,
                 p.estimated_price AS estimatedPrice,
                 p.capacity,
                 p.status,
                 pm.file_path AS imageUrl,
                 p.created_at AS createdAt
          FROM travel_packages p
          JOIN destinations d ON d.id = p.destination_id
          JOIN users u ON u.id = p.provider_id
          LEFT JOIN package_media pm ON pm.package_id = p.id AND pm.is_primary = 1`
}

function parsePositiveNumber(value: unknown, field: string) {
  const numberValue = Number(value)
  if (!Number.isFinite(numberValue) || numberValue <= 0) {
    throw badRequest(`${field} must be a positive number`)
  }

  return numberValue
}

function parseRequiredString(value: unknown, field: string) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw badRequest(`${field} is required`)
  }

  return value.trim()
}

packagesRouter.get('/', async (req, res, next) => {
  try {
    const destinationId = req.query.destinationId ? Number(req.query.destinationId) : null
    const params: number[] = []
    let whereClause = 'WHERE p.status = "active"'

    if (destinationId) {
      whereClause += ' AND p.destination_id = ?'
      params.push(destinationId)
    }

    const [packages] = await pool.query<PackageRow[]>(
      `${packageSelect()} ${whereClause} ORDER BY p.created_at DESC`,
      params,
    )

    res.json({ packages })
  } catch (error) {
    next(error)
  }
})

packagesRouter.get('/mine', authenticate, requireRole('provider'), async (req, res, next) => {
  try {
    const user = (req as AuthenticatedRequest).user
    const [packages] = await pool.query<PackageRow[]>(
      `${packageSelect()} WHERE p.provider_id = ? ORDER BY p.created_at DESC`,
      [user.id],
    )

    res.json({ packages })
  } catch (error) {
    next(error)
  }
})

packagesRouter.post('/', authenticate, requireApprovedProvider, upload.single('image'), async (req, res, next) => {
  const connection = await pool.getConnection()

  try {
    const user = (req as AuthenticatedRequest).user
    const destinationId = parsePositiveNumber(req.body.destinationId, 'Destination')
    const title = parseRequiredString(req.body.title, 'Title')
    const description = parseRequiredString(req.body.description, 'Description')
    const durationDays = Math.round(parsePositiveNumber(req.body.durationDays, 'Duration days'))
    const estimatedPrice = parsePositiveNumber(req.body.estimatedPrice, 'Estimated price')
    const capacity = Math.round(parsePositiveNumber(req.body.capacity, 'Capacity'))

    if (!req.file) {
      throw badRequest('Package image is required')
    }

    const [destinationRows] = await connection.query<RowDataPacket[]>(
      'SELECT id FROM destinations WHERE id = ? LIMIT 1',
      [destinationId],
    )
    if (destinationRows.length === 0) {
      throw badRequest('Destination does not exist')
    }

    await connection.beginTransaction()
    const [packageResult] = await connection.execute<ResultSetHeader>(
      `INSERT INTO travel_packages
       (provider_id, destination_id, title, description, duration_days, estimated_price, capacity, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, "active")`,
      [user.id, destinationId, title, description, durationDays, estimatedPrice, capacity],
    )

    const filePath = `${env.publicUploadBaseUrl}/${req.file.filename}`
    const imageBlob = await readFile(req.file.path)

    await connection.execute(
      `INSERT INTO package_media
       (package_id, file_path, mime_type, original_name, image_blob, is_primary)
       VALUES (?, ?, ?, ?, ?, 1)`,
      [packageResult.insertId, filePath, req.file.mimetype, req.file.originalname, imageBlob],
    )

    await connection.commit()
    res.status(201).json({ id: packageResult.insertId, message: 'Package created' })
  } catch (error) {
    await connection.rollback()
    next(error)
  } finally {
    connection.release()
  }
})

packagesRouter.get('/:id', async (req, res, next) => {
  try {
    const packageId = Number(req.params.id)
    if (!Number.isInteger(packageId) || packageId <= 0) {
      throw badRequest('Invalid package id')
    }

    const [rows] = await pool.query<PackageRow[]>(
      `${packageSelect()} WHERE p.id = ? LIMIT 1`,
      [packageId],
    )

    const travelPackage = rows[0]
    if (!travelPackage) {
      throw notFound('Package not found')
    }

    res.json({ package: travelPackage })
  } catch (error) {
    next(error)
  }
})

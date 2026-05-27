import { Router } from 'express'
import { badRequest } from '../utils/httpError.js'

export const externalRouter = Router()

externalRouter.get('/wiki-summary', async (req, res, next) => {
  try {
    const title = String(req.query.title ?? '').trim()

    if (!title) {
      throw badRequest('title query is required')
    }

    const response = await fetch(
      `https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
      {
        headers: {
          accept: 'application/json',
          'user-agent': 'HiddenGemExplorer/0.1 (student project)',
        },
      },
    )

    if (!response.ok) {
      res.status(response.status).json({ message: 'External summary is not available' })
      return
    }

    const data = await response.json()
    res.json(data)
  } catch (error) {
    next(error)
  }
})

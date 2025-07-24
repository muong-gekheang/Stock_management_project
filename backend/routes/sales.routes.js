import express from 'express'
import { authenticate } from '../middleware/auth.middleware.js'
import { getUserSales } from '../controllers/sales.controller.js'

const router = express.Router()

router.get('/', authenticate, getUserSales)

export default router
import express from 'express'
import { authenticate } from '../middleware/auth.middleware.js'
import { getUserSales, createSale } from '../controllers/sales.controller.js'

const router = express.Router()

router.get('/', authenticate, getUserSales)
router.post('/', authenticate, createSale)

export default router
import express from 'express'
import { authenticate } from '../middleware/auth.middleware.js'
import { getProfile, updateProfile, changePassword } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/profile', authenticate, getProfile)
router.put('/profile', authenticate, updateProfile)
router.post('/change-password', authenticate, changePassword)

export default router
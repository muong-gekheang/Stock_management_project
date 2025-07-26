import express from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { getUserPurchases, createPurchase } from '../controllers/purchase.controller.js';

const router = express.Router();

router.get('/', authenticate, getUserPurchases);
router.post('/', authenticate, createPurchase)

export default router;
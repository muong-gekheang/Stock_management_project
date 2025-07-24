import express from 'express';
import { getUserProducts, createUserProduct } from '../controllers/product.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, getUserProducts);
router.post('/', authenticate, createUserProduct)

export default router;


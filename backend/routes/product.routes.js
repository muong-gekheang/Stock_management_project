import express from 'express';
import { getUserProducts, createUserProduct, getLowStockProducts, getProductByID } from '../controllers/product.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, getUserProducts);
router.post('/', authenticate, createUserProduct)
router.get('/low-stock', authenticate, getLowStockProducts)
router.get('/:id', authenticate, getProductByID)

export default router;


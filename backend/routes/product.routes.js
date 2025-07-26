import express from 'express';
import { getUserProducts, createUserProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, getUserProducts);
router.post('/', authenticate, createUserProduct);
router.put('/:productId', authenticate, updateProduct);
router.delete('/:productId', authenticate, deleteProduct);

export default router;


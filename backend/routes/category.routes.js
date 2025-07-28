import express from 'express';
import { getCategories, addCategory, deleteCategory} from '../controllers/category.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, getCategories);
router.post('/', authenticate, addCategory);
router.delete('/:id', authenticate, deleteCategory);

export default router;
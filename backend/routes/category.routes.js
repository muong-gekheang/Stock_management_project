import express from 'express';
import { getCategories } from '../controllers/category.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate, getCategories);

export default router;
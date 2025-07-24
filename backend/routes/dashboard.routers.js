import express from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticate,  getDashboardStats);

export default router;

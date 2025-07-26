import { getUserSuppliers } from "../controllers/supplier.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import express from 'express'

const router = express.Router()

router.get('/', authenticate, getUserSuppliers)

export default router
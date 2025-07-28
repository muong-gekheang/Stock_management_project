import { getUserSuppliers, getUserSuppliersById, addNewSupplier, updateSupplier, deleteSupplier } from "../controllers/supplier.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import express from 'express'

const router = express.Router()

router.get('/', authenticate, getUserSuppliers);
router.get('/:supplierId', authenticate, getUserSuppliersById);
router.post('/', authenticate, addNewSupplier);
router.put('/:supplierId', authenticate, updateSupplier);
router.delete('/:supplierId', authenticate, deleteSupplier);

export default router
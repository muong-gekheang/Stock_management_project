
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from './routes/product.routes.js'
import userRoutes from './routes/user.routes.js'
import dashboardRoutes from './routes/dashboard.routers.js'
import categoryRoutes from './routes/category.routes.js'
import supplierRoutes from './routes/supplier.routes.js'
import saleRoutes from './routes/sales.routes.js'
import purchaseRoutes from './routes/purchase.routes.js'
import { connectDB, sequelize } from './config/db.js';

const app = express()

// Connect to database
connectDB();

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/categories", categoryRoutes)
app.use("/api/suppliers", supplierRoutes)
app.use("/api/sales", saleRoutes)
app.use("/api/purchases", purchaseRoutes)

const PORT = process.env.PORT || 3001

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database and tables synced')
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
  }) 
  .catch (err => {
    console.error('Error syncing database:', err);
  })
  



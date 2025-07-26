import { Router } from "express";
import { login, getProfile, register } from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const authRoute = Router()

authRoute.post("/register", register);
authRoute.post('/login', login)
authRoute.get('/profile', authenticate, getProfile)

export default authRoute
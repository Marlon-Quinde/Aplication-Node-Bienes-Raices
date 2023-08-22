import { Router } from "express";
import { authController } from "./controller";

const authRoutes = Router();

authRoutes.get('/login', authController)

export default authRoutes
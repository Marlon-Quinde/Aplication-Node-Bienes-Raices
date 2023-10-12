import express from "express";
import { propiedades } from "./controller";

const router = express.Router();

router.get("/propiedades", propiedades);

export default router;

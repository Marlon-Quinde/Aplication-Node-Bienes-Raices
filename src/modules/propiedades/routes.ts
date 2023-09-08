import express from "express";
import { admin, crear, guardar } from "./controller";
import { validarCrearPropiedad } from "../../validations";

const router = express.Router();

router.get("/mis-propiedades", admin);
router.get("/propiedades/crear", crear);
router.post("/propiedades/crear", validarCrearPropiedad, guardar);

export default router;

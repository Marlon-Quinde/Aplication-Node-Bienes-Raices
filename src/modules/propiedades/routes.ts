import express from "express";
import { admin, crear, guardar } from "./controller";
import { validarCrearPropiedad } from "../../validations";
import { protegerRuta } from "../../middlewares/proteger-rutas";

const router = express.Router();

router.get("/mis-propiedades", protegerRuta, admin);
router.get("/propiedades/crear", protegerRuta, crear);
router.post("/propiedades/crear", protegerRuta, validarCrearPropiedad, guardar);

export default router;

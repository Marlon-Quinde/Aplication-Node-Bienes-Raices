import express from "express";
import {
  admin,
  agregarImagen,
  almacenarImagen,
  crear,
  guardar,
  editar,
  guardarCambios,
  eliminar,
  mostrarPropiedad,
} from "./controller";
import {
  validarCrearPropiedad,
  validarEditarPropiedad,
} from "../../validations";
import { protegerRuta } from "../../middlewares/proteger-rutas";
import upload from "../../middlewares/subir-imagen";

const router = express.Router();

router.get("/mis-propiedades", protegerRuta, admin);
router.get("/propiedades/crear", protegerRuta, crear);
router.post("/propiedades/crear", protegerRuta, validarCrearPropiedad, guardar);
router.get("/propiedades/agregar-imagen/:id", protegerRuta, agregarImagen);
router.post(
  "/propiedades/agregar-imagen/:id",
  protegerRuta,
  upload.single("imagen"),
  almacenarImagen
);

router.get("/propiedades/editar/:id", protegerRuta, editar);
router.post(
  "/propiedades/editar/:id",
  protegerRuta,
  validarEditarPropiedad,
  guardarCambios
);
router.post("/propiedades/:id", protegerRuta, eliminar);

router.get("/propiedad/:id", mostrarPropiedad);

export default router;

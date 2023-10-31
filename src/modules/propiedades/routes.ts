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
  enviarMensaje,
  verMensajes,
  cambiarEstado,
} from "./controller";
import {
  validarCrearPropiedad,
  validarEditarPropiedad,
  validarMensaje,
} from "../../validations";
import { protegerRuta } from "../../middlewares/proteger-rutas";
import upload from "../../middlewares/subir-imagen";
import { identificarUsuario } from "../../middlewares/identificar-usuario";

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
router.put("/propiedades/:id", protegerRuta, cambiarEstado);
router.post("/propiedades/:id", protegerRuta, eliminar);

router.get("/propiedad/:id", identificarUsuario, mostrarPropiedad);

router.post(
  "/propiedad/:id",
  validarMensaje,
  identificarUsuario,
  enviarMensaje
);

router.get("/mensajes/:id", protegerRuta, verMensajes);

export default router;

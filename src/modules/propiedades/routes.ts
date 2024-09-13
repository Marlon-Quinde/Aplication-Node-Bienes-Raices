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
import { signOz } from "../../middlewares/signoz";

const router = express.Router();

router.get("/mis-propiedades", signOz, protegerRuta, admin);
router.get("/propiedades/crear", signOz, protegerRuta, crear);
router.post("/propiedades/crear", signOz, protegerRuta, validarCrearPropiedad, guardar);
router.get("/propiedades/agregar-imagen/:id", signOz,protegerRuta, agregarImagen);
router.post(
  "/propiedades/agregar-imagen/:id",
  signOz,
  protegerRuta,
  upload.single("imagen"),
  almacenarImagen
);
router.get("/propiedades/editar/:id", signOz, protegerRuta, editar);

router.post(
  "/propiedades/editar/:id",
  signOz,
  protegerRuta,
  validarEditarPropiedad,
  guardarCambios
);
router.put("/propiedades/:id", signOz, protegerRuta, cambiarEstado);
router.post("/propiedades/:id", signOz, protegerRuta, eliminar);

router.get("/propiedad/:id", signOz, identificarUsuario, mostrarPropiedad);

router.post(
  "/propiedad/:id",
  signOz,
  validarMensaje,
  identificarUsuario,
  enviarMensaje
);

router.get("/mensajes/:id", signOz, protegerRuta, verMensajes);

export default router;

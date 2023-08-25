import express from "express";
import {
  formularioLogin,
  formularioRegistro,
  formularioOlvidePassword,
  registrar,
  confirmar,
} from "./controller";
import { validarUsuario } from "../../validations";

const router = express.Router();

router.get("/login", validarUsuario, formularioLogin);
router.get("/registro" , formularioRegistro);
router.post("/registrar", validarUsuario , registrar);
router.get("/olvide-password", formularioOlvidePassword);
router.get("/confirmar/:token", confirmar);

export default router;

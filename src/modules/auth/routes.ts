import express from "express";
import {
  formularioLogin,
  autenticar,
  formularioRegistro,
  formularioOlvidePassword,
  registrar,
  confirmar,
  resetPassword,
  comprobarToken,
  nuevoPassword,
} from "./controller";
import {
  validarPassword,
  validarEmail,
  validarUsuario,
  validarLogin,
} from "../../validations";

const router = express.Router();

//? Login
router.get("/login", validarUsuario, formularioLogin);
router.post("/login", validarLogin, autenticar);

//? Registro
router.get("/registro", formularioRegistro);
router.post("/registrar", validarUsuario, registrar);

//? Reset password
router.get("/olvide-password", formularioOlvidePassword);
router.get("/confirmar/:token", confirmar);
router.post("/olvide-password", validarEmail, resetPassword);

//Almacena el nuevo password
router.get("/olvide-password/:token", comprobarToken);
router.post("/olvide-password/:token", validarPassword, nuevoPassword);

export default router;

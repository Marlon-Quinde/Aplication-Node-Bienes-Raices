import express from "express";
import {
  formularioLogin,
  formularioRegistro,
  formularioOlvidePassword,
  registrar,
  confirmar,
} from "./controller";

const router = express.Router();

router.get(
  "/login",
  [
    //Aqui van todos lo middelware
  ],
  formularioLogin
);
router.get("/registro", formularioRegistro);
router.post("/registrar", registrar);
router.get("/olvide-password", formularioOlvidePassword);
router.get("/confirmar", confirmar);

export default router;

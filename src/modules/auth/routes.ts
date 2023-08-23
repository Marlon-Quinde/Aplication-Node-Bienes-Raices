import express from "express";
import {
  formularioLogin,
  formularioRegistro,
  formularioOlvidePassword,
  registrar,
} from "./controller";

const router = express.Router();

router.get("/login", formularioLogin);
router.get("/registro", formularioRegistro);
router.post("/registrar", registrar);
router.get("/olvide-password", formularioOlvidePassword);

export default router;

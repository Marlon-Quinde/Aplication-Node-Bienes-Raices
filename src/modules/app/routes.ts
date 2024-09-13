import express from "express";

import { buscador, categoria, inicio, noEncontrado } from "./controller";
import { signOz } from "../../middlewares/signoz";

const router = express.Router();

// Pagina Inicio
router.get("/", signOz, inicio);

// Categorias
router.get("/categoria/:id", signOz, categoria);

// Pagina 404
router.get("/404", signOz, noEncontrado);

// Buscador
router.post("/buscador", signOz, buscador);

export default router;

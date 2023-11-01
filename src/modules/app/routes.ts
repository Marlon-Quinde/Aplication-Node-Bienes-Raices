import express from "express";

import { buscador, categoria, inicio, noEncontrado } from "./controller";

const router = express.Router();

// Pagina Inicio
router.get("/", inicio);

// Categorias
router.get("/categoria/:id", categoria);

// Pagina 404
router.get("/404", noEncontrado);

// Buscador
router.post("/buscador", buscador);

export default router;

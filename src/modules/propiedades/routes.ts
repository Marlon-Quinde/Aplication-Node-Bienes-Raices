import express from "express";
import { admin } from "./controller";

const router = express.Router();

router.get("/mis-propiedades", admin);

export default router;
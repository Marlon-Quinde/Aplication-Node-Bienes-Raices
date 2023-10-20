// const express = require("express"); // Common JS
import express from "express"; //ES6
import cookieParser from "cookie-parser";
import usuarioRoutes from "./modules/auth/routes";
import propiedadesRoutes from "./modules/propiedades/routes";
import appRoutes from "./modules/app/routes";
import apiRoutes from "./modules/api/routes";
import db from "./config/db";
import path from "path";
import { BACKEND_PORT } from "./environments";

const csrf = require("@dr.pogodin/csurf");
// Crear la App
const app = express();
const csrfProtection = csrf({ cookie: true });

//Habilitar lectura datos de formulario
app.use(express.urlencoded({ extended: true }));

// Habilitar el Coocke Paser
app.use(cookieParser());
app.use(csrfProtection);

//Conexion a db
async function main() {
  try {
    await db.authenticate();
    await db.sync();
    console.log("conexion correcta");
  } catch (error) {
    console.log(error);
  }
}

main();

const viewsPath = path.join(__dirname, "views");

// console.log({
//   viewsPath,
// });

// Habilitar pug
app.set("view engine", "pug");
app.set("views", viewsPath);

//Carpeta Publica
app.use(express.static("public"));

// Routing
app.use("/auth", usuarioRoutes);
app.use("/", propiedadesRoutes);
app.use("/", appRoutes);

// api
app.use("/api", apiRoutes);

//?Definir un puerto y arrancar el proyecto
const port = BACKEND_PORT || 3000;
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});

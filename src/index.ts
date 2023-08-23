// const express = require("express"); // Common JS
import express from "express"; //ES6
import usuarioRoutes from "./modules/auth/routes";
import db from "./config/db";
import path from "path";

// Crear la App
const app = express();

//Habilitar lectura datos de formulario
app.use(express.urlencoded({ extended: true }));

//Conexion a db
async function main() {
  try {
    await db.authenticate();
    // await db.sync();
    console.log("conexion correcta");
  } catch (error) {
    console.log(error);
  }
}

main();

const viewsPath = path.join(__dirname, 'views')

// console.log({
//   viewsPath
// });


// Habilitar pug
app.set("view engine", "pug");
app.set("views", viewsPath);

//Carpeta Publica
app.use(express.static("public"));

// Routing
app.use("/auth", usuarioRoutes);

//?Definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, () => {
  console.log(`El servidor esta funcionando en el puerto ${port}`);
});

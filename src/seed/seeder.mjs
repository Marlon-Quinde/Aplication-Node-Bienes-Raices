import { exit } from "node:process";
import { categorias } from "./categoria.ts";
import Categoria from "../models/Categoria.ts";
import db from "../config/db.ts";

const importarDatos = async () => {
  try {
    //Autenticar en la base de datos

    await db.authenticate();
    //Generar columnas

    await db.sync();

    //Insertar los datos
    await Categoria.bulkCreate(categorias);
    console.log("Datos importados correctamente");
    exit(0);
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

if (process.argv[2] === "-i") {
  importarDatos();
}

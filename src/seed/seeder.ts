import categorias from "./categoria";
import Categoria from "../models/Categoria";
import db from "../config/db";
const importarDatos = async () => {
  try {
    //Autenticar en la base de datos

    await db.authenticate();
    //Generar columnas

    await db.sync();

    //Insertar los datos
    await Categoria.bulkCreate(categorias);
    console.log("Datos importados correctamente");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-i") {
  importarDatos();
}

import { DataTypes } from "sequelize";
import db from "../config/db";

const Categoria = db.define("categoria", {
  nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});

export default Categoria;

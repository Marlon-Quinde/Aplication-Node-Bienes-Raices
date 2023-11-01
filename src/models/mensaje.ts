import { DataTypes } from "sequelize";
import db from "../config/db";

const Mensaje = db.define("mensajes", {
  mensajes: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
});

export default Mensaje;

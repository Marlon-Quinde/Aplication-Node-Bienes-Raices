import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import db from "../config/db";

const Usuario = db.define(
  "usuarios",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: DataTypes.STRING,
    confirmado: DataTypes.BOOLEAN,
  },
  {
    hooks: {
      beforeCreate: async function (usuario: any) {
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(usuario.password, salt);
      },
    },
    scopes: {
      eliminarPassword: {
        attributes: {
          exclude: [
            "password",
            "token",
            "confirmado",
            "createdAt",
            "updatedAt",
          ],
        },
      },
    },
  }
);

//TODO: Crear un helper
(Usuario.prototype as any).verificarPassword = function (password: string) {
  return bcrypt.compareSync(password, this.password);
};

export default Usuario;

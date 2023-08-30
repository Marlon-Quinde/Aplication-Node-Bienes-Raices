import { Model } from "sequelize";

export interface UsuarioInterface extends Model {
  id: number;
  nombre: string;
  email: string;
  password: string;
  token: string;
  confirmado: boolean;
  createdAt: Date;
  updatedAt: Date;
  verificarPassword: (password: string) => boolean
}

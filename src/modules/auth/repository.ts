import { UsuarioInterface } from "../../interfaces/usuario.interface";
import Usuario from "../../models/Usuario";

export class UserRepository {

  async buscarUsuarioPorEmail (email: string) {
    const existeUsuario: UsuarioInterface = await Usuario.findOne({
      where: { email },
    });

    return existeUsuario
  }

  async buscarUsuarioPorToken (token: string) {
    const existeUsuario: UsuarioInterface = await Usuario.findOne({
      where: { token },
    });

    return existeUsuario
  }
}

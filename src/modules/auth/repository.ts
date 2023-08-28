import { UsuarioInterface } from "../../interfaces/usuario.interface";
import Usuario from "../../models/Usuario";

export class UserRepository {

  async existeUsuario (email: string) {
    const existeUsuario: UsuarioInterface = await Usuario.findOne({
      where: { email },
    });

    return existeUsuario
  }
}

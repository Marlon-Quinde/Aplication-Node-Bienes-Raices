import { Response } from "express";
import { UserRepository } from "./repository";
export default class AuthService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async existeUsuario(email: string) {
    return await this.userRepository.existeUsuario(email);
  }

  renderLoginPage(
    res: Response,
    ruta: string,
    pagina: string,
    csrfToken: string,
    errores?: any
  ) {
    res.render(ruta, {
      pagina,
      csrfToken,
      errores,
    });
  }
}

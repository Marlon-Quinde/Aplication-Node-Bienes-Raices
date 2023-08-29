import { Response } from "express";
import { UserRepository } from "./repository";
export default class AuthService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async buscarUsuarioPorEmail(email: string) {
    return await this.userRepository.buscarUsuarioPorEmail(email);
  }

  async buscarUsuarioPorToken(token: string){
    return this.userRepository.buscarUsuarioPorToken(token);
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

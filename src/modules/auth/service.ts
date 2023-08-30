import { Response } from "express";
import { UserRepository } from "./repository";
import { PropertiesRender } from "../../interfaces/render.interface";
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
    ctx: PropertiesRender
  ) {
    res.render(ruta, {
     ...ctx
    });
  }
}

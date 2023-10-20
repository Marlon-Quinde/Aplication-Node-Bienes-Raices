import { Response } from "express";
import { AppRender } from "../../interfaces/render.interface";
import { AppRepository } from "./repository";

export default class AppService {
  private readonly appRepository: AppRepository;

  constructor() {
    this.appRepository = new AppRepository();
  }

  renderAuthPage(res: Response, ruta: string, ctx: AppRender) {
    res.render(ruta, { ...ctx });
  }

  async getAllCategorias() {
    return await this.appRepository.GetAllCategorias();
  }

  async getCategoriaPrecios() {
    return await this.appRepository.GetCategoriasPrecios();
  }
}

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

  async getCategoriaById(id: string) {
    return await this.appRepository.CategoriaById(id);
  }

  async getAllPropiedades(id: number) {
    return await this.appRepository.GetAllPropiedades(id);
  }

  async consultarRegistro(termino: string) {
    return await this.appRepository.ConsultarPropiedad(termino);
  }
}

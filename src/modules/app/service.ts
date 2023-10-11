import { Response } from "express";
import { AppRender } from "../../interfaces/render.interface";
import { AppRepository } from "./repository";

export default class AppService {
  private readonly appService: AppRepository;

  constructor() {
    this.appService = new AppRepository();
  }

  renderAuthPage(res: Response, ruta: string, ctx: AppRender) {
    res.render(ruta, { ...ctx });
  }

  async getAllCategorias() {
    return await this.appService.GetAllCategorias();
  }
}

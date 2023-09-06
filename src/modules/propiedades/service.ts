import { Response } from "express";
import { PropertiesRender } from "../../interfaces/render.interface";
import { PropiedadesRepository } from "./repository";

export class PropiedadesService {
  private readonly propiedadesRepostory: PropiedadesRepository;

  constructor() {
    this.propiedadesRepostory = new PropiedadesRepository();
  }
  renderPagePropiedades(res: Response, ruta: string, ctx: PropertiesRender) {
    res.render(ruta, { ...ctx });
  }

  async getCategoriasYPrecios() {
    return await this.propiedadesRepostory.ConsultarPrecio();
  }
}

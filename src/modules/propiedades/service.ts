import { Response } from "express";
import { PropertiesRender } from "../../interfaces/render.interface";

export class PropiedadesService {
  renderPagePropiedades(res: Response, ruta: string, ctx: PropertiesRender) {
    res.render(ruta, { ...ctx });
  }
}

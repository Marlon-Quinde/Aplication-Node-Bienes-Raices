import { Request, Response } from "express";
import { PropiedadesService } from "./service";
import { PropertiesRender } from "../../interfaces/render.interface";

const propiedadesService = new PropiedadesService();
export const admin = (req: Request, res: Response) => {
  const ctx: PropertiesRender = {
    pagina: "Mis Propiedades",
    barra: true,
  };
  propiedadesService.renderPagePropiedades(res, "propiedades/admin", ctx);
};

export const crear = (req: Request, res: Response) => {
  const ctx: PropertiesRender = {
    pagina: "Crear Propiedad",
    barra: true,
  };
  propiedadesService.renderPagePropiedades(res, "propiedades/crear", ctx);
};

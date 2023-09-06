import { Request, Response } from "express";
import { PropiedadesService } from "./service";
import { PropertiesRender } from "../../interfaces/render.interface";
import Categoria from "../../models/Categoria";
import Precio from "../../models/Precio";
import { CategoriaInterface } from "../../interfaces/categoria.interface";
import { Model } from "sequelize";

const propiedadesService = new PropiedadesService();
export const admin = (req: Request, res: Response) => {
  const ctx: PropertiesRender = {
    pagina: "Mis Propiedades",
    barra: true,
  };
  propiedadesService.renderPagePropiedades(res, "propiedades/admin", ctx);
};

export const crear = async (req: Request, res: Response) => {
  // Consultar modelo de precios y categorias
  const [categorias, precios]: [Model<any, any>[], Model<any, any>[]] =
    await propiedadesService.getCategoriasYPrecios();
  categorias.map((e) => e.dataValues);
  precios.map((e) => e.dataValues);

  const ctx: PropertiesRender = {
    pagina: "Crear Propiedad",
    barra: true,
    categorias: categorias as any,
    precios: precios as any,
  };
  propiedadesService.renderPagePropiedades(res, "propiedades/crear", ctx);
};

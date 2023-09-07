import { Request, Response } from "express";
import { PropiedadesService } from "./service";
import { PropertiesRender } from "../../interfaces/render.interface";
import Categoria from "../../models/Categoria";
import Precio from "../../models/Precio";
import { CategoriaInterface } from "../../interfaces/categoria.interface";
import { Model } from "sequelize";
import { validationResult } from "express-validator";
import { csrfRequest } from "../../interfaces/crsf.interface";

const propiedadesService = new PropiedadesService();
export const admin = (req: Request, res: Response) => {
  const ctx: PropertiesRender = {
    pagina: "Mis Propiedades",
    barra: true,
  };
  propiedadesService.renderPagePropiedades(res, "propiedades/admin", ctx);
};

export const crear = async (req: csrfRequest, res: Response) => {
  // Consultar modelo de precios y categorias
  const [categorias, precios] =
    await propiedadesService.getCategoriasYPrecios();
  const category = categorias.map((e) => e.dataValues);
  const price = precios.map((e) => e.dataValues);

  const ctx: PropertiesRender = {
    pagina: "Crear Propiedad",
    barra: true,
    csrfToken: req.csrfToken!(),
    categorias: category,
    precios: price,
  };
  propiedadesService.renderPagePropiedades(res, "propiedades/crear", ctx);
};

export const guardar = async (req: csrfRequest, res: Response) => {
  let resultado = validationResult(req);

  const [categorias, precios] =
    await propiedadesService.getCategoriasYPrecios();
  const category = categorias.map((e) => e.dataValues);
  const price = precios.map((e) => e.dataValues);
  if (!resultado.isEmpty()) {
    const ctx: PropertiesRender = {
      pagina: "Crear Propiedad",
      barra: true,
      csrfToken: req.csrfToken!(),
      categorias: category,
      precios: price,
      errores: resultado.array()
    };
    propiedadesService.renderPagePropiedades(res, 'propiedades/crear', ctx);
  }
  console.log("HOLA MUNDO");
};

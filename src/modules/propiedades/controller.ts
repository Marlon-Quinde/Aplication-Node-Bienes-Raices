import { Request, Response } from "express";
import { PropiedadesService } from "./service";
import { PropertiesRender } from "../../interfaces/render.interface";
import { validationResult } from "express-validator";
import { csrfRequest } from "../../interfaces/crsf.interface";
import { Precio, Categoria, Propiedad } from "../../models/index";
import { PropiedadInterface } from "../../interfaces/propiedad.interface";

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
    datos: {},
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
      errores: resultado.array(),
      datos: req.body,
    };
    return propiedadesService.renderPagePropiedades(
      res,
      "propiedades/crear",
      ctx
    );
  }

  const {
    titulo,
    descripcion,
    categoria: categoriaId,
    habitaciones,
    estacionamiento,
    wc,
    precio: precioId,
    calle,
    lat,
    lng,
  } = req.body as PropiedadInterface;

  const { id: usuarioId } = (req as any).usuario;

  try {
    const propiedadAlmacenada = await Propiedad.create({
      titulo,
      descripcion,
      habitaciones,
      estacionamiento,
      wc,
      categoriaId,
      usuarioId,
      precioId,
      calle,
      lat,
      lng,
      imagen: "",
    });

    const { id } = propiedadAlmacenada.dataValues;

    res.redirect(`/propiedades/agregar-imagen/${id}`);
  } catch (error) {
    console.log(error);
  }
  // console.log(req.body);
};

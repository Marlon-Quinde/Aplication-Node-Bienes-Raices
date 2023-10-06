import { NextFunction, Request, Response } from "express";
import { PropiedadesService } from "./service";
import { PropertiesRender } from "../../interfaces/render.interface";
import { validationResult } from "express-validator";
import { csrfRequest } from "../../interfaces/crsf.interface";
import { Precio, Categoria, Propiedad } from "../../models/index";
import {
  DBPropiedad,
  PropiedadInterface,
} from "../../interfaces/propiedad.interface";
import { Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { UsuarioInterface } from "../../interfaces/usuario.interface";

const propiedadesService = new PropiedadesService();
export const admin = async  (req: Request, res: Response) => {
  const {id} = (req as any).usuario;
  

  const propiedades = await propiedadesService.getAllPropiedades(id);

  const allPropiedades = propiedades.map(({dataValues}) => dataValues)
  

  console.log(allPropiedades);

  const ctx: PropertiesRender = {
    pagina: "Mis Propiedades",
    propiedades: allPropiedades
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

export const agregarImagen = async (req: csrfRequest, res: Response) => {
  const { id } = req.params;

  //Validar que exista
  const propiedad = await propiedadesService.getPropiedadById(id);

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  const value: DBPropiedad = propiedad.dataValues;

  const { publicado, usuarioId } = value;

  //Validar que este publicada
  if (publicado) {
    return res.redirect("/mis-propiedades");
  }

  const dataValueUsuario = propiedadesService.getUsuario(req);

  const usuario = dataValueUsuario.dataValues;

  //Validar que la propiedad pertenece a quien visita esta pagina
  if (usuarioId.toString() !== usuario.id.toString()) {
    return res.redirect("/mis-propiedades");
  }

  const ctx: PropertiesRender = {
    pagina: `Agregar Imagen: ${value.titulo}`,
    propiedad: value,
    csrfToken: req.csrfToken!(),
  };
  propiedadesService.renderPagePropiedades(
    res,
    "propiedades/agregar-imagen",
    ctx
  );
};

export const almacenarImagen = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  //Validar que exista
  const propiedad: any = await propiedadesService.getPropiedadById(id);

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  const { publicado, usuarioId } = propiedad.dataValues;

  //Validar que este publicada
  if (publicado) {
    return res.redirect("/mis-propiedades");
  }
  const dataValueUsuario = propiedadesService.getUsuario(req);

  const usuario = dataValueUsuario.dataValues;

  //Validar que la propiedad pertenece a quien visita esta pagina
  if (usuarioId.toString() !== usuario.id.toString()) {
    return res.redirect("/mis-propiedades");
  }

  try {
    //Almacenar una instancia de la propiedad
    propiedad.imagen = req.file!.filename;
    propiedad.publicado = 1;
    // console.log(req.file);
    await propiedad.save();
    next();
  } catch (error) {
    console.log(error);
  }
};


export const editar = async (req: Request, res: Response, next: NextFunction) => {
  const {dataValues} = (req as any).usuario;
  const {id} = req.params
  const propiedad = await propiedadesService.getPropiedadByIdAndUserId(id.toString(), dataValues.id.toString());

  if(!propiedad) {
    return res.redirect('/mis-propiedades');
  }
  console.log(propiedad);
  const [categorias, precios] =
    await propiedadesService.getCategoriasYPrecios();
  const category = categorias.map((e) => e.dataValues);
  const price = precios.map((e) => e.dataValues);

  const ctx: PropertiesRender = {
    pagina: `Editar Propiedad: ${propiedad.dataValues.titulo}`,
    csrfToken: (req as any).csrfToken(),
    categorias: category,
    precios: price,
    datos: propiedad,
  };
  propiedadesService  .renderPagePropiedades(res, "propiedades/editar", ctx);
}

export const guardarCambios = async (req: Request, res: Response) => {
  
  // Verificar la validacion

  let resultado = validationResult(req);

  const [categorias, precios] =
    await propiedadesService.getCategoriasYPrecios();
  const category = categorias.map((e) => e.dataValues);
  const price = precios.map((e) => e.dataValues);
  if (!resultado.isEmpty()) {
    // console.log(req.body)
    const ctx: PropertiesRender = {
      pagina: `Editar Propiedad`,
      csrfToken: (req as any).csrfToken(),
      categorias: category,
      precios: price,
      errores: resultado.array(),
      datos: req.body,
    };
    return propiedadesService.renderPagePropiedades(
      res,
      "propiedades/editar",
      ctx
    );
  }
  const {dataValues} = (req as any).usuario;
  const {id} = req.params
  const propiedad = await propiedadesService.getPropiedadByIdAndUserId(id.toString(), dataValues.id.toString());

  if(!propiedad) {
    return res.redirect('/mis-propiedades');
  }

  try {
    console.log(propiedad);
  } catch (error) {
    console.log(error);
  }
}
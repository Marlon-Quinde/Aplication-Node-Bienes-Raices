import { unlink } from "node:fs/promises";
import { NextFunction, Request, Response } from "express";
import { PropiedadesService } from "./service";
import { PropertiesRender } from "../../interfaces/render.interface";
import { validationResult } from "express-validator";
import { csrfRequest } from "../../interfaces/crsf.interface";
import { Precio, Categoria, Propiedad, Mensaje } from "../../models/index";
import fs from "fs";
import {
  DBPropiedad,
  PropiedadInterface,
} from "../../interfaces/propiedad.interface";
import { Model, InferAttributes, InferCreationAttributes } from "sequelize";
import {
  UsuarioInterface,
  UsuarioSinDataSensible,
} from "../../interfaces/usuario.interface";
import AppService from "../app/service";
import { esVendedor } from "../../helpers";
import { formatearFecha } from "../../helpers/index";

const propiedadesService = new PropiedadesService();
const appService = new AppService();
export const admin = async (req: Request, res: Response) => {
  // Leer QueryString

  const { pagina: paginaActual } = req.query;

  const expresion = /^[1-9]$/;

  if (!expresion.test(paginaActual as string)) {
    return res.redirect("/mis-propiedades?pagina=1");
  }

  // Limites y offset para el paginador

  try {
    const limit: number = 10;
    const offset: number = Number(paginaActual) * limit - limit;
    const { id } = (req as any).usuario;

    const [propiedades, total] = await propiedadesService.getAllPropiedades(
      id,
      limit,
      offset
    );

    const allPropiedades = propiedades.map(({ dataValues }) => dataValues);

    const ctx: PropertiesRender = {
      pagina: "Mis Propiedades",
      csrfToken: (req as any).csrfToken!(),
      propiedades: allPropiedades,
      paginas: Math.ceil(total / limit),
      paginaActual: Number(paginaActual as string),
      total,
      offset,
      limit,
    };
    propiedadesService.renderPagePropiedades(res, "propiedades/admin", ctx);
  } catch (error) {
    console.log(error);
  }
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

export const editar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { dataValues } = (req as any).usuario;
  const { id } = req.params;
  const propiedad = await propiedadesService.getPropiedadByIdAndUserId(
    id.toString(),
    dataValues.id.toString()
  );

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  if (!propiedad.dataValues.publicado) {
    const ctx: PropertiesRender = {
      pagina: `Agregar Imagen: ${propiedad.dataValues.titulo}`,
      propiedad: propiedad.dataValues,
      csrfToken: (req as any).csrfToken(),
    };
    return propiedadesService.renderPagePropiedades(
      res,
      "propiedades/agregar-imagen",
      ctx
    );
  }

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
  propiedadesService.renderPagePropiedades(res, "propiedades/editar", ctx);
};

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
  const { dataValues } = (req as any).usuario;
  const { id } = req.params;
  const propiedad = await propiedadesService.getPropiedadByIdAndUserId(
    id.toString(),
    dataValues.id.toString()
  );

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Reescribir objeto y actualizarlo
  try {
    const {
      titulo,
      descripcion,
      categoriaId,
      habitaciones,
      estacionamiento,
      wc,
      precioId,
      calle,
      lat,
      lng,
    } = req.body as DBPropiedad;

    propiedad.set({
      titulo,
      descripcion,
      categoriaId,
      habitaciones,
      estacionamiento,
      wc,
      precioId,
      calle,
      lat,
      lng,
    });

    await propiedad.save();

    res.redirect("/mis-propiedades");
  } catch (error) {
    console.log(error);
  }
};

export const eliminar = async (req: Request, res: Response) => {
  const { dataValues } = (req as any).usuario;
  const { id } = req.params;
  const propiedad = await propiedadesService.getPropiedadByIdAndUserId(
    id.toString(),
    dataValues.id.toString()
  );

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  // Eliminar la imagen asociada
  const imagenExiste = fs.existsSync(
    `public/uploads/${propiedad.dataValues.imagen}`
  );

  if (!imagenExiste) {
    await unlink(`public/uploads/${propiedad.dataValues.imagen}`);
  }

  // Eliminar la propiedad
  await propiedad.destroy();
  res.redirect("/mis-propiedades");
};

// Modifica el estado de la propiead

export const cambiarEstado = async (req: Request, res: Response) => {
  const { dataValues } = (req as any).usuario;
  const { id } = req.params;
  const propiedad = await propiedadesService.getPropiedadByIdAndUserId(
    id.toString(),
    dataValues.id.toString()
  );

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  (propiedad as any).publicado = !(propiedad as any).publicado;

  await propiedad.save();
  res.json({
    resultado: "ok",
  });
};

export const mostrarPropiedad = async (req: Request, res: Response) => {
  const { id } = req.params;
  const propiedad = await propiedadesService.getPropiedadRelacionada(id);
  const categorias = await appService.getAllCategorias();

  if (!propiedad) {
    res.redirect("/404");
  }

  const ctx: PropertiesRender = {
    propiedad: propiedad?.dataValues,
    pagina: propiedad?.dataValues.titulo,
    categorias,
    csrfToken: (req as any).csrfToken(),
    usuario: (req as any).usuario,
    esVendedor: esVendedor(
      (req as any).usuario?.id.toString(),
      propiedad?.dataValues.usuarioId.toString()
    ),
  };
  propiedadesService.renderPagePropiedades(res, "propiedades/mostrar", ctx);
};

export const enviarMensaje = async (req: Request, res: Response) => {
  const { id } = req.params;

  const propiedad = await propiedadesService.getPropiedadRelacionada(id);
  const categorias = await appService.getAllCategorias();

  if (!propiedad) {
    res.redirect("/404");
  }

  // Render errores
  const resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    const ctx: PropertiesRender = {
      propiedad: propiedad?.dataValues,
      pagina: propiedad?.dataValues.titulo,
      categorias,
      csrfToken: (req as any).csrfToken(),
      usuario: (req as any).usuario,
      esVendedor: esVendedor(
        (req as any).usuario?.id.toString(),
        propiedad?.dataValues.usuarioId.toString()
      ),
      errores: resultado.array(),
    };
    return propiedadesService.renderPagePropiedades(
      res,
      "propiedades/mostrar",
      ctx
    );
  }

  // Almacenar mensaje
  const { mensaje: mensajes } = req.body;
  const { id: propiedadId } = req.params;
  const { id: usuarioId }: UsuarioSinDataSensible = (req as any).usuario;

  await Mensaje.create({
    mensajes,
    usuarioId,
    propiedadId,
  });

  const ctx: PropertiesRender = {
    propiedad: propiedad?.dataValues,
    pagina: propiedad?.dataValues.titulo,
    categorias,
    csrfToken: (req as any).csrfToken(),
    usuario: (req as any).usuario,
    esVendedor: esVendedor(
      (req as any).usuario?.id.toString(),
      propiedad?.dataValues.usuarioId.toString()
    ),
    enviado: true,
  };
  propiedadesService.renderPagePropiedades(res, "propiedades/mostrar", ctx);
};

export const verMensajes = async (req: Request, res: Response) => {
  const { id } = req.params;
  const propiedad = await propiedadesService.getMensajesPropiedadById(
    id.toString()
  );

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  const ctx: PropertiesRender = {
    pagina: "Mensajes",
    mensajes: propiedad.dataValues.mensajes,
    formatearFecha,
  };
  propiedadesService.renderPagePropiedades(res, "propiedades/mensajes", ctx);
};

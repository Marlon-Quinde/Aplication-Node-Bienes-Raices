import { Request, Response } from "express";
import AppService from "./service";
import { AppRender } from "../../interfaces/render.interface";

const appService = new AppService();

export const inicio = async (req: Request, res: Response) => {
  const [categorias, precios, casas, departamentos] =
    await appService.getCategoriaPrecios();
  const ctx = {
    pagina: "Inicio",
    categorias,
    precios,
    casas,
    departamentos,
    usuario: (req as any).usuario,
    csrfToken: (req as any).csrfToken(),
  };
  return appService.renderAuthPage(res, "inicio", ctx);
};
export const categoria = async (req: Request, res: Response) => {
  const { id } = req.params;

  const categoria = await appService.getCategoriaById(id.toString());
  const categorias = await appService.getAllCategorias();

  if (!categoria) {
    res.redirect("/404");
  }

  const propiedades = await appService.getAllPropiedades(Number(id));

  res.render("categoria", {
    pagina: `${(categoria as any).nombre}s en Venta`,
    propiedades,
    categoria,
    categorias,
    csrfToken: (req as any).csrfToken(),
    usuario: (req as any).usuario
  });
};
export const noEncontrado = async (req: Request, res: Response) => {
  const categorias = await appService.getAllCategorias();
  res.render("404", {
    pagina: "No encontrada",
    categorias,
    csrfToken: (req as any).csrfToken(),
  });
};
export const buscador = async (req: Request, res: Response) => {
  const { termino } = req.body;

  //Validar que el termino no este vacio
  if (!termino.trim()) {
    return res.redirect("back");
  }

  // Consultar las propiedades
  const propiedades = await appService.consultarRegistro(termino);
  const categorias = await appService.getAllCategorias();

  res.render("busqueda", {
    pagina: "Resultados de la Busqueda",
    categorias,
    propiedades,
    csrfToken: (req as any).csrfToken(),
  });
};

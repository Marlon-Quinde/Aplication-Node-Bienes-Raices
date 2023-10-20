import { Request, Response } from "express";
import AppService from "./service";
import { AppRender } from "../../interfaces/render.interface";

const appService = new AppService();

export const inicio = async (req: Request, res: Response) => {
  const [categorias, precios, casas, departamentos] = await appService.getCategoriaPrecios();
  const ctx: AppRender = {
    pagina: "Inicio",
    categorias,
    precios, casas, departamentos
  };
  return appService.renderAuthPage(res, "inicio", ctx);
};
export const categoria = (req: Request, res: Response) => {};
export const noEncontrado = (req: Request, res: Response) => {};
export const buscador = (req: Request, res: Response) => {};

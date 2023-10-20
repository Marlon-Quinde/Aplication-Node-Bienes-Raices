import { Request, Response } from "express";
import AppService from "./service";
import { AppRender } from "../../interfaces/render.interface";

const appService = new AppService();

export const inicio = async (req: Request, res: Response) => {
  const [categorias, precios] = await appService.getCategoriaPrecios();
  console.log("[CATEGORIAS]", categorias);
  const ctx: AppRender = {
    pagina: "Inicio",
    categorias,
    precios,
  };
  return appService.renderAuthPage(res, "inicio", ctx);
};
export const categoria = (req: Request, res: Response) => {};
export const noEncontrado = (req: Request, res: Response) => {};
export const buscador = (req: Request, res: Response) => {};

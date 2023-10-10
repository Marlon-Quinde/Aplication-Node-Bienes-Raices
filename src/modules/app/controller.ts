import { Request, Response } from "express";

export const inicio = (req: Request, res: Response) => {
  res.send("Hola mundo");
};
export const categoria = (req: Request, res: Response) => {};
export const noEncontrado = (req: Request, res: Response) => {};
export const buscador = (req: Request, res: Response) => {};

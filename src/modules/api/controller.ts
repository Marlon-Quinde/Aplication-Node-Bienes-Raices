import { Request, Response } from "express";

export const propiedades = async (req: Request, res: Response) => {
  res.json({
    respuesta: "OK",
  });
};

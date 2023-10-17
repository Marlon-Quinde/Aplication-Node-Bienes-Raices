import { Request, Response } from "express";
import { ApiService } from "./service";

const apiService = new ApiService();

export const propiedades = async (req: Request, res: Response) => {
  const propiedades = await apiService.apiGetAllPropiedades();
  res.json(propiedades);
};

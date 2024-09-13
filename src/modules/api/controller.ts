import { Request, Response } from "express";
import { ApiService } from "./service";

const apiService = new ApiService();

export const propiedades = async () => {
  const propiedades = await apiService.apiGetAllPropiedades();
  return propiedades
};

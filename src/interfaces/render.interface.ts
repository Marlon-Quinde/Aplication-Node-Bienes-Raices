import { CategoriaInterface } from "./categoria.interface";
import { PrecioInterface } from "./precio.interface";
import { body } from "express-validator";

export interface PropertiesRender {
  pagina: string;
  csrfToken?: string;
  mensaje?: string;
  errores?: Record<string, unknown>[];
  usuario?: Record<string, string> | any;
  error?: boolean;
  barra?: boolean;
  categorias?: CategoriaInterface[] | any;
  precios?: PrecioInterface[];
  datos?: object;
  propiedad?: object;
  propiedades?: any[];
  paginas?: number;
  paginaActual?: number;
  total?: number;
  offset?: number;
  limit?: number;
  esVendedor?: boolean;
}

export interface AppRender {
  pagina: string;
  categorias?: any[];
  precios?: any[];
  casas?: any[];
  departamentos?: any[];
}

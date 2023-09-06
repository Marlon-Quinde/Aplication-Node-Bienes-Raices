import { CategoriaInterface } from "./categoria.interface";
import { PrecioInterface } from "./precio.interface";

export interface PropertiesRender {
  pagina: string;
  csrfToken?: string;
  mensaje?: string;
  errores?: Record<string, unknown>[];
  usuario?: Record<string, string>;
  error?: boolean;
  barra?: boolean;
  categorias?: CategoriaInterface[];
  precios?: PrecioInterface[];
}

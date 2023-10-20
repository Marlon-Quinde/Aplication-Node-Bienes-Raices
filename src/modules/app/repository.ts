import { Categoria, Precio, Propiedad } from "../../models/index";

export class AppRepository {
  async GetAllCategorias() {
    return await Categoria.scope("eliminarDataInnecesaria").findAll();
  }

  async GetCategoriasPrecios() {
    return await Promise.all([
      Categoria.findAll({ raw: true }),
      Precio.findAll({ raw: true }),
    ]);
  }
}

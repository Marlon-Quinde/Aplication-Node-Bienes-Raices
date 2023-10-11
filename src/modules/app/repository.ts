import { Categoria } from "../../models";

export class AppRepository {
  async GetAllCategorias() {
    return await Categoria.scope("eliminarDataInnecesaria").findAll();
  }
}

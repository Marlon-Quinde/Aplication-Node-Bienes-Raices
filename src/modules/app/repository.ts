import { Categoria, Precio, Propiedad } from "../../models/index";

export class AppRepository {
  async GetAllCategorias() {
    return await Categoria.scope("eliminarDataInnecesaria").findAll();
  }

  async GetCategoriasPrecios() {
    return await Promise.all([
      Categoria.findAll({ raw: true }),
      Precio.findAll({ raw: true }),
      Propiedad.findAll({
        limit: 3,
        where: { categoriaId: 1 },
        include: [
          { model: Precio, as: "precio" },
          // {model: Categoria, as: 'precio'}
        ],
        order: [["createdAt", "DESC"]],
      }),
      Propiedad.findAll({
        limit: 3,
        where: { categoriaId: 2 },
        include: [{ model: Precio, as: "precio" }],
        order: [["createdAt", "DESC"]],
      }),
    ]);
  }
}

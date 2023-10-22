import { Categoria, Precio, Propiedad } from "../../models/index";
import { Op } from "sequelize";
export class AppRepository {
  async GetAllCategorias() {
    return await Categoria.scope("eliminarDataInnecesaria").findAll({
      raw: true,
    });
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

  async CategoriaById(id: string) {
    return await Categoria.findByPk(id, { raw: true });
  }

  async GetAllPropiedades(id: number) {
    return await Propiedad.findAll({
      where: { categoriaId: id },
      // raw: true,
      limit: 10,
      order: [["createdAt", "ASC"]],
      include: [{ model: Precio, as: "precio" }],
    });
  }

  async ConsultarPropiedad(termino: string) {
    return await Propiedad.findAll({
      where: {
        titulo: {
          [Op.like]: "%" + termino + "%",
        },
      },
      include: [{ model: Precio, as: "precio" }],
    });
  }
}

import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { Propiedad, Categoria, Precio } from "../../models";
import { PrecioInterface } from "../../interfaces/precio.interface";
import { CategoriaInterface } from "../../interfaces/categoria.interface";

export class PropiedadesRepository {
  async ConsultarPrecio() {
    const consultar: [
      Model<CategoriaInterface, CategoriaInterface>[],
      Model<PrecioInterface, PrecioInterface>[]
    ] = await Promise.all([Categoria.findAll(), Precio.findAll()]);
    return consultar;
  }

  async GetPropiedadById(id: string) {
    const propiedad = await Propiedad.findByPk(id);

    return propiedad;
  }

  async GetAllPropiedadesById(id: number, limit: number, offset: number) {
    const propiedad = Promise.all([
      Propiedad.findAll({
        limit,
        offset,
        where: { usuarioId: id },
        include: [
          { model: Categoria, as: "categoria" },
          { model: Precio, as: "precio" },
        ],
      }),
      Propiedad.count({
        where: {
          usuarioId: id,
        },
      }),
    ]);
    return propiedad;
  }

  async GetPropiedadByIdAndByUserId(id: string, usuarioId: string) {
    const propiedad = await Propiedad.findOne({
      where: {
        id,
        usuarioId,
      },
    });
    return propiedad;
  }

  async GetPropiedadRelacionada(id: string) {
    const propiedad = await Propiedad.findByPk(id, {
      include: [
        { model: Categoria, as: "categoria" },
        { model: Precio, as: "precio" },
      ],
    });
    return propiedad;
  }
}

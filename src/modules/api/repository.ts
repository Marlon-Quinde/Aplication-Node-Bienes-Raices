import { Propiedad, Precio, Categoria } from "../../models";

export class ApiRepository {
  async ApiGetAllPropiedades() {
    return await Propiedad.findAll({
      include: [
        { model: Precio, as: "precio" },
        { model: Categoria, as: "categoria" },
      ],
    });
  }
}

import Categoria from "../../models/Categoria";
import Precio from "../../models/Precio";

export class PropiedadesRepository {
  async ConsultarPrecio() {
    const consultar = await Promise.all([
      Categoria.findAll(),
      Precio.findAll(),
    ]);
    return consultar;
  }
}

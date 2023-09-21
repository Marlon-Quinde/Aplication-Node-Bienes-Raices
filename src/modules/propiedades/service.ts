import { Response } from "express";
import { PropertiesRender } from "../../interfaces/render.interface";
import { PropiedadesRepository } from "./repository";
import { InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { UsuarioInterface } from "../../interfaces/usuario.interface";
import { PropiedadInterface } from "../../interfaces/propiedad.interface";

export class PropiedadesService {
  private readonly propiedadesRepostory: PropiedadesRepository;

  constructor() {
    this.propiedadesRepostory = new PropiedadesRepository();
  }
  renderPagePropiedades(res: Response, ruta: string, ctx: PropertiesRender) {
    res.render(ruta, { ...ctx });
  }

  async getCategoriasYPrecios() {
    return await this.propiedadesRepostory.ConsultarPrecio();
  }

  async getPropiedadById(id: string) {
    return await this.propiedadesRepostory.GetPropiedadById(id);
  }

  getUsuario(req: any) {
    const dataValueUsuario: Model<
      InferAttributes<UsuarioInterface>,
      InferCreationAttributes<UsuarioInterface>
    > = req.usuario;
    return dataValueUsuario;
  }
}

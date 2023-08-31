import { Request, Response } from "express";
import { PropiedadesService } from "./service";
import { PropertiesRender } from "../../interfaces/render.interface";

const propiedadesService = new PropiedadesService()
export const admin = (req: Request, res: Response) => {
    const ctx: PropertiesRender = {
        pagina: "Mis Propiedades"
    }
    propiedadesService.renderPagePropiedades(res, "propiedades/admin", ctx);
}
import { NextFunction, Request, Response } from "express";
import { TOKEN_KEY } from "../environments";
import { Usuario } from "../models/index";
import jwt from "jsonwebtoken";
import { TokenInterface } from "../interfaces/token.interface";
import {
  UsuarioInterface,
  UsuarioSinDataSensible,
} from "../interfaces/usuario.interface";
import { RespuestaObjeto } from "../interfaces/response-database.interface";

export const protegerRuta = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //VERIFICAR SI HAY UN TOKEN

  const { _token } = req.cookies;

  if (!_token) {
    return res.redirect("/auth/login");
  }

  //COMPROBAR SI ESE TOKEN ES VALIDO

  try {
    const decoded = jwt.verify(_token, TOKEN_KEY!) as TokenInterface;
    const usuario: RespuestaObjeto<UsuarioSinDataSensible> =
      await Usuario.scope("eliminarPassword").findByPk(decoded.id);

    //Almacenar el usuario al request

    if (usuario) {
      (req as any).usuario = usuario;
      // res.redirect("/mis-propiedades");
      return next();
    } else {
      return res.redirect("/auth/login");
    }
  } catch (error) {
    return res.clearCookie("_token").redirect("/auth/login");
  }
};

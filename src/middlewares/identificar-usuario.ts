import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario";
import { NextFunction, Request, Response } from "express";
import { TOKEN_KEY } from "../environments";
import { TokenInterface } from "../interfaces/token.interface";

export const identificarUsuario = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Identificar que existe el token en las cookies
  const token = req.cookies._token;

  if (!token) {
    (req as any).usuario = null;
    return next();
  }
  // Comprobar el token

  try {
    const decoded = jwt.verify(token, TOKEN_KEY!) as TokenInterface;

    const usuario = await Usuario.scope("eliminarPassword").findByPk(
      decoded.id,
      { raw: true }
    );
    // console.log(["decoded", decoded]);
    if (usuario) {
      (req as any).usuario = usuario;
    }
    return next();
  } catch (error) {
    console.log(error);
    return res.clearCookie("_token").redirect("/auth/login");
  }
  next();
};

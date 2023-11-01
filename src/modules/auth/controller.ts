import { csrfRequest } from "./../../interfaces/crsf.interface";
import { check, validationResult } from "express-validator";
import Usuario from "../../models/Usuario";
import { generarId, generarToken } from "../../helpers/tokens";
import { emailOlvidePassowrd, emailRegistro } from "../../helpers/email";
import { Request, Response, NextFunction } from "express";
import { UsuarioInterface } from "../../interfaces/usuario.interface";
import bcrypt from "bcrypt";
import AuthService from "./service";
import { PropertiesRender } from "../../interfaces/render.interface";

const authService = new AuthService();

export const formularioLogin = (req: csrfRequest, res: Response) => {
  const ctx: PropertiesRender = {
    pagina: "Iniciar Sesión",
    csrfToken: req.csrfToken!(),
  };
  authService.renderLoginPage(res, "auth/login", ctx);
};

export const autenticar = async (req: csrfRequest, res: Response) => {
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    const ctx: PropertiesRender = {
      pagina: "Iniciar Sesión",
      csrfToken: req.csrfToken!(),
      errores: resultado.array(),
    };
    return authService.renderLoginPage(res, "auth/login", ctx);
  }
  const { password, email } = req.body;

  const usuario: any = await authService.buscarUsuarioPorEmail(email);

  if (!usuario) {
    const cnx: PropertiesRender = {
      pagina: "Iniciar sesion",
      csrfToken: req.csrfToken!(),
      errores: [{ msg: "Ese usuario no existe" }],
    };
    return authService.renderLoginPage(res, "auth/login", cnx);
  }

  if (!usuario.confirmado) {
    const ctx: PropertiesRender = {
      pagina: "Iniciar Sesión",
      csrfToken: req.csrfToken!(),
      errores: [{ msg: "Tiene un correo pendiente de verificación" }],
    };
    return authService.renderLoginPage(res, "auth/login", ctx);
  }

  if (!usuario.verificarPassword(password)) {
    const ctx: PropertiesRender = {
      pagina: "Iniciar Sesión",
      csrfToken: req.csrfToken!(),
      errores: [{ msg: "Contraseña Incorrecta" }],
    };
    return authService.renderLoginPage(res, "auth/login", ctx);
  }

  const token = generarToken(usuario.id, usuario.nombre);

  //Almacenar en el cookie
  res
    .cookie("_token", token, {
      httpOnly: true,
      // secure: true
    })
    .redirect("/mis-propiedades");
};

export const cerrarSesion = (req: Request, res: Response) => {
  return res.clearCookie("_token").status(200).redirect("/auth/login");
};

export const formularioRegistro = (req: csrfRequest, res: Response) => {
  const ctx: PropertiesRender = {
    pagina: "Crear Cuenta",
    csrfToken: req.csrfToken!(),
  };
  authService.renderLoginPage(res, "auth/registro", ctx);
};

export const registrar = async (req: csrfRequest, res: Response) => {
  //Validaciones

  let resultado = validationResult(req);

  //Verificar que el resultado esta vacio
  if (!resultado.isEmpty()) {
    const ctx: PropertiesRender = {
      pagina: "Crear cuenta",
      csrfToken: req.csrfToken!(),
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    };
    //Errores
    return authService.renderLoginPage(res, "auth/registro", ctx);
  }

  const { nombre, email, password } = req.body;

  const existeUsuario = await authService.buscarUsuarioPorEmail(email);

  if (existeUsuario) {
    const ctx: PropertiesRender = {
      pagina: "Crear cuenta",
      csrfToken: req.csrfToken!(),
      errores: [{ msg: "El usuario ya esta registrado" }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    };
    return authService.renderLoginPage(res, "auth/registro", ctx);
  }

  // Almacenar usuario
  const usuario: UsuarioInterface = await Usuario.create({
    nombre,
    email,
    password,
    token: generarId(),
  });

  // Enviar email de confirmación
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  const ctx: PropertiesRender = {
    pagina: "Cuenta Creada Correctamente",
    mensaje: "Hemos enviado un Email de Confirmación",
  };

  authService.renderLoginPage(res, "templates/mensaje", ctx);
};

export const confirmar = async (req: Request, res: Response) => {
  const { token } = req.params;

  // Verificar si e token es valido

  const usuario: any = await authService.buscarUsuarioPorToken(token);

  if (!usuario) {
    const ctx: PropertiesRender = {
      pagina: "Error al confirmar tu cuenta",
      mensaje: "Hubo un error al confirmar cuenta, intenta de nuevo",
      error: true,
    };
    return authService.renderLoginPage(res, "auth/confirmar-cuenta", ctx);
  }

  usuario.token = null;
  usuario.confirmado = true;

  await usuario.save();

  const ctx: PropertiesRender = {
    pagina: "Cuenta Confirmada",
    mensaje: "La cuenta se confirmo exitosamente",
  };
  authService.renderLoginPage(res, "auth/confirmar-cuenta", ctx);
  // Confirmar la cuenta
};

export const formularioOlvidePassword = (req: csrfRequest, res: Response) => {
  const ctx: PropertiesRender = {
    csrfToken: req.csrfToken!(),
    pagina: "Recupera tu contraseña de BienesRaices",
  };
  authService.renderLoginPage(res, "auth/olvide-password", ctx);
};

export const resetPassword = async (req: csrfRequest, res: Response) => {
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    const ctx: PropertiesRender = {
      pagina: "Recuperar tu acceso a BienesRaices",
      csrfToken: req.csrfToken!(),
      errores: resultado.array(),
    };
    return authService.renderLoginPage(res, "auth/olvide-password", ctx);
  }

  const { email } = req.body;

  const existeUsuario = await authService.buscarUsuarioPorEmail(email);
  if (!existeUsuario) {
    const ctx: PropertiesRender = {
      pagina: "Recuperar tu acceso a BienesRaices",
      csrfToken: req.csrfToken!(),
      errores: [{ msg: "No existe un usuario con ese correo" }],
    };
    return authService.renderLoginPage(res, "auth/olvide-password", ctx);
  }

  const nuevoToken = generarId();
  existeUsuario.token = nuevoToken;
  await existeUsuario.save();

  emailOlvidePassowrd({
    email,
    nombre: existeUsuario.nombre,
    token: nuevoToken,
  });

  const ctx: PropertiesRender = {
    pagina: "Restablece tu password",
    mensaje:
      "Hemos enviado un Email de con las instrucciones, presiona en el enlace",
  };

  authService.renderLoginPage(res, "templates/mensaje", ctx);
};

export const comprobarToken = async (req: csrfRequest, res: Response) => {
  const { token } = req.params;

  const usuario: UsuarioInterface = await authService.buscarUsuarioPorToken(
    token
  );
  if (!usuario) {
    const ctx: PropertiesRender = {
      pagina: "Reestablece tu password",
      mensaje: "Hubo un error al validar tu información, intenta de nuevo",
      error: true,
    };

    return authService.renderLoginPage(res, "auth/confirmar-cuenta", ctx);
  }

  const ctx: PropertiesRender = {
    pagina: "Reestablece tu password",
    csrfToken: req.csrfToken!(),
  };
  return authService.renderLoginPage(res, "auth/reset-password", ctx);
};

export const nuevoPassword = async (req: csrfRequest, res: Response) => {
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    const ctx: PropertiesRender = {
      pagina: "Reestablece tu password",
      csrfToken: req.csrfToken!(),
      errores: resultado.array(),
    };

    return authService.renderLoginPage(res, "auth/reset-password", ctx);
  }

  const { token } = req.params;

  const usuario: any = await authService.buscarUsuarioPorToken(token);

  if (!usuario) {
    const ctx: PropertiesRender = {
      pagina: "Reestablece tu password",
      csrfToken: req.csrfToken!(),
      errores: [{ msg: "No existe ningun usuario con ese token" }],
    };
    return authService.renderLoginPage(res, "auth/reset-password", ctx);
  }

  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);
  usuario.token = null;

  await usuario.save();
  const ctx: PropertiesRender = {
    pagina: "Password Reestablecido",
    mensaje: "El password se guardo correctamente",
  };

  authService.renderLoginPage(res, "auth/confirmar-cuenta", ctx);
};

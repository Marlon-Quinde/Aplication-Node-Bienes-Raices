import { check, validationResult } from "express-validator";
import Usuario from "../../models/Usuario";
import { generarId } from "../../helpers/tokens";
import { emailOlvidePassowrd, emailRegistro } from "../../helpers/email";
import { Request, Response, NextFunction } from "express";
import { UsuarioInterface } from "../../interfaces/usuario.interface";
import { csrfRequest } from "../../interfaces/crsf.interface";
import bcrypt from "bcrypt";

export const formularioLogin = (req: csrfRequest, res: Response) => {
  res.render("auth/login", {
    pagina: "Iniciar Sesion",
    csrfToken: req.csrfToken!(),
  });
};

export const autenticar = async (req: csrfRequest, res: Response) => {
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    res.render("auth/login", {
      pagina: "Iniciar sesión",
      csrfToken: req.csrfToken!(),
      errores: resultado.array(),
    });
  }
  const { password, email } = req.body;

  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario) {
    return res.render("auth/login", {
      pagina: "Iniciar sesión",
      csrfToken: req.csrfToken!(),
      errores: [{ msg: "Ese usuario no existe" }],
    });
  }
  if (!usuario.confirmado) {
    return res.render("auth/login", {
      pagina: "Iniciar sesión",
      csrfToken: req.csrfToken!(),
      errores: [{ msg: "Tiene un correo pendiente de verificación" }],
    });
  }

  if (!usuario.verificarPassword(password)) {
    return res.render("auth/login", {
      pagina: "Iniciar sesión",
      csrfToken: req.csrfToken!(),
      errores: [{ msg: "Contraseña Incorrecta" }],
    });
  }

  return res.render("auth/login", {
    pagina: "Iniciar sesión",
    csrfToken: req.csrfToken!(),
    errores: [{ msg: "Contraseña Correcta" }],
  });
};
export const formularioRegistro = (req: csrfRequest, res: Response) => {
  // console.log("[TOKEN]", req.csrfToken!());
  // console.log("[Body]", req.body);
  res.render("auth/registro", {
    pagina: "Crear cuenta",
    csrfToken: req.csrfToken!(),
  });
};

export const registrar = async (req: csrfRequest, res: Response) => {
  //Validaciones

  let resultado = validationResult(req);

  //Verificar que el resultado esta vacio
  if (!resultado.isEmpty()) {
    //Errores
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      csrfToken: req.csrfToken!(),
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  const { nombre, email, password } = req.body;

  //Verificar que el usuario no este duplicado

  const existeUsuario: UsuarioInterface = await Usuario.findOne({
    where: { email },
  });

  if (existeUsuario) {
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      csrfToken: req.csrfToken!(),
      errores: [{ msg: "El usuario ya esta registrado" }],
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
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

  res.render("templates/mensaje", {
    pagina: "Cuenta Creada Correctamente",
    mensaje: "Hemos enviado un Email de Confirmación",
  });
};

export const confirmar = async (req: Request, res: Response) => {
  const { token } = req.params;

  // Verificar si e token es valido

  const usuario = await Usuario.findOne({ where: { token } });

  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Error al confirmar tu cuenta",
      mensaje: "Hubo un error al confirmar cuenta, intenta de nuevo",
      error: true,
    });
  }

  usuario.token = null;
  usuario.confirmado = true;

  await usuario.save();
  return res.render("auth/confirmar-cuenta", {
    pagina: "Cuenta confirmada",
    mensaje: "La cuenta se confirmo exitosamente",
  });
  // Confirmar la cuenta
};

export const formularioOlvidePassword = (req: csrfRequest, res: Response) => {
  res.render("auth/olvide-password", {
    csrfToken: req.csrfToken!(),
    pagina: "Recupera tu contraseña de BienesRaices",
  });
};

export const resetPassword = async (req: csrfRequest, res: Response) => {
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    return res.render("auth/olvide-password", {
      pagina: "Recuperar tu acceso a BienesRaices",
      csrfToken: req.csrfToken!(),
      errores: resultado.array(),
    });
  }

  const { email } = req.body;

  console.log(req.body);
  const existeUsuario: UsuarioInterface = await Usuario.findOne({
    where: { email },
  });

  if (!existeUsuario) {
    return res.render("auth/olvide-password", {
      pagina: "Recuperar tu acceso a BienesRaices",
      csrfToken: req.csrfToken!(),
      errores: [{ msg: "No existe un usuario con ese correo" }],
    });
  }

  const nuevoToken = generarId();
  existeUsuario.token = nuevoToken;
  await existeUsuario.save();

  emailOlvidePassowrd({
    email,
    nombre: existeUsuario.nombre,
    token: nuevoToken,
  });

  res.render("templates/mensaje", {
    pagina: "Restablece tu password",
    mensaje:
      "Hemos enviado un Email de con las instrucciones, presiona en el enlace",
  });
};

export const comprobarToken = async (req: csrfRequest, res: Response) => {
  const { token } = req.params;

  const usuario: UsuarioInterface = await Usuario.findOne({
    where: { token },
  });
  if (!usuario) {
    return res.render("auth/confirmar-cuenta", {
      pagina: "Reestablece tu password",
      mensaje: "Hubo un error al validar tu información, intenta de nuevo",
      error: true,
    });
  }

  res.render("auth/reset-password", {
    pagina: "Reestablece tu password",
    csrfToken: req.csrfToken!(),
  });
};

export const nuevoPassword = async (req: csrfRequest, res: Response) => {
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    return res.render("auth/reset-password", {
      pagina: "Reestablece tu password",
      csrfToken: req.csrfToken!(),
      errores: resultado.array(),
    });
  }

  const { token } = req.params;

  const usuario = await Usuario.findOne({ where: { token } });

  if (!usuario) {
    return res.render("auth/reset-password", {
      pagina: "Reestablece tu password",
      csrfToken: req.csrfToken!(),
      errores: [{ msg: "No existe ningun usuario con ese token" }],
    });
  }

  const { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  usuario.password = await bcrypt.hash(password, salt);
  usuario.token = null;

  await usuario.save();

  return res.render("auth/confirmar-cuenta", {
    pagina: "Password Reestablecido",
    mensaje: "El password se guardo correctamente",
  });
};

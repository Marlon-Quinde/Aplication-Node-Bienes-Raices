import { check, validationResult } from "express-validator";
import Usuario from "../../models/Usuario";
import { generarId } from "../../helpers/tokens";
import { emailRegistro } from "../../helpers/email";
import { Request, Response, NextFunction } from "express";
import { UsuarioInterface } from "../../interfaces/usuario.interface";

const formularioLogin = (req: Request, res: Response) => {
  res.render("auth/login", {
    pagina: "Iniciar Sesion",
  });
};
const formularioRegistro = (req: Request, res: Response) => {
  res.render("auth/registro", {
    pagina: "Crear cuenta",
  });
};

const formularioOlvidePassword = (req: Request, res: Response) => {
  res.render("auth/olvide-password", {
    pagina: "Recupera tu contraseña de BienesRaices",
  });
};
const registrar = async (req: Request, res: Response) => {
  //Validaciones
  
  let resultado = validationResult(req);

  //Verificar que el resultado esta vacio
  if (!resultado.isEmpty()) {
    //Errores
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      },
    });
  }

  const { nombre, email, password } = req.body;

  //Verificar que el usuario no este duplicado
  const existeUsuario = await Usuario.findOne({
    where: { email },
  });

  if (existeUsuario) {
    return res.render("auth/registro", {
      pagina: "Crear cuenta",
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
    mensaje: "Hemos enviado un Email de Confirmación, presiona en el enlace",
  });
};

const confirmar = async (req: Request, res: Response) => {
  const { token } = req.params;
  console.log(token);

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

export {
  formularioLogin,
  formularioRegistro,
  formularioOlvidePassword,
  registrar,
  confirmar,
};

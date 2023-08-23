import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import { generarId } from "../helpers/tokens.js";

const formularioLogin = (req, res) => {
  res.render("auth/login", {
    pagina: "Iniciar Sesion",
  });
};
const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear cuenta",
  });
};

const formularioOlvidePassword = (req, res) => {
  res.render("auth/olvide-password", {
    pagina: "Recupera tu contraseña de BienesRaices",
  });
};
const registrar = async (req, res) => {
  //Validaciones
  await check("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .run(req);
  await check("email").isEmail().withMessage("Eso no parece un email").run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("El password debe ser de al menos 6 caracteres")
    .run(req);
  await check("repetir_password")
    .equals("password")
    .withMessage("Los password no son iguales")
    .run(req);
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

  await Usuario.create({
    nombre,
    email,
    password,
    token: generarId(),
  });
};

export {
  formularioLogin,
  formularioRegistro,
  formularioOlvidePassword,
  registrar,
};

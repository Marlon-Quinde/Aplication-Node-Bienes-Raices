import { body } from "express-validator";

export const validarUsuario = [
  body("nombre", "El nombre es obligatorio").exists().notEmpty(),
  body("email", "Eso no parece un email").exists().isEmail(),
  body("password", "El password debe ser de al menos 6 caracteres")
    .exists()
    .isLength({ min: 6 }),
  body("repetir_password", "Los password no son iguales")
    .exists()
    .custom((value, { req }) => value === req.body.password),
];

export const validarEmail = [
  body("email", "Eso no parece un email").exists().isEmail(),
];

export const validarPassword = [
  body("password", "El password debe ser de al menos 6 caracteres")
    .exists()
    .isLength({ min: 6 }),
];

export const validarLogin = [
  body("password", "La contraseña es requerida").exists().notEmpty(),
  body("email", "Eso no parece un email").exists().isEmail(),
];

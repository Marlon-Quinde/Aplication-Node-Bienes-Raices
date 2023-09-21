import { body } from "express-validator";

export const validarUsuario = [
  body("nombre")
    .exists()
    .notEmpty()
    .withMessage("Por favor, ingresa tu nombre"),
  body("email").exists().isEmail().withMessage("Eso no parece un email"),
  body("password")
    .exists()
    .isLength({ min: 6 })
    .withMessage("El password debe ser de al menos 6 caracteres"),
  body("repetir_password")
    .exists()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Los password no coinciden"),
];

export const validarEmail = [
  body("email").exists().isEmail().withMessage("Eso no parece un email"),
];

export const validarPassword = [
  body("password")
    .exists()
    .isLength({ min: 6 })
    .withMessage("El password debe ser de al menos 6 caracteres"),
];

export const validarLogin = [
  body("password")
    .exists()
    .notEmpty()
    .withMessage("La contraseña es obligatoria"),
  body("email").exists().isEmail().withMessage("Eso no parece un email"),
];

export const validarCrearPropiedad = [
  body("titulo", "El titulo del anuncio es obligatorio").notEmpty(),
  body("descripcion")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ max: 200 })
    .withMessage("La descripción es muy larga"),
  body("categoria").isNumeric().withMessage("Selecciona una categoria"),
  body("precio").isNumeric().withMessage("Selecciona un rango de precio"),
  body("habitaciones")
    .isNumeric()
    .withMessage("Selecciona la cantidad de habitaciones"),
  body("estacionamiento")
    .isNumeric()
    .withMessage("Selecciona un rango de estacionamientos"),
  body("wc").isNumeric().withMessage("Selecciona la cantidad de Baños"),
  body("lat").notEmpty().withMessage("Ubica la propiedad en el mapa"),
];

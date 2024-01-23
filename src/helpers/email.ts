import nodemailer from "nodemailer";
import {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  BACKEND_URL,
  BACKEND_PORT,
} from "../environments";
import { EmailConfirmacionInterface } from "../interfaces/email-confirmacion.interface";
export const emailRegistro = async (datos: EmailConfirmacionInterface) => {
  const transport = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const { email, nombre, token } = datos;

  //Enviar email

  await transport.sendMail({
    from: "marlon.quin.cor@outlook.es",
    to: email,
    subject: "Confirma tu cuenta en BienesRaices.com",
    text: "Confirma tu cuenta en BienesRaices.com",
    html: `
      <p>Hola ${nombre}, comprueba tu cuenta en bienesRaices.com</p>
      <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:
      <a href="${BACKEND_URL}:${
      BACKEND_PORT ?? 3000
    }/auth/confirmar/${token}">Confirmar tu cuenta</a> 
      </p>
      <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    `,
  });
};

export const emailOlvidePassowrd = async (
  datos: EmailConfirmacionInterface
) => {
  const transport = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const { email, nombre, token } = datos;

  //Enviar email

  await transport.sendMail({
    from: "BienesRaices.com",
    to: email,
    subject: "Restablece tu password en BienesRaices.com",
    text: "Restablece tu password en BienesRaices.com",
    html: `
      <p>Hola ${nombre}, has solicitado restablecer tu password en BienesRaices</p>
      <p>Sigue el siguiente enlace para generar un passsword nuevo en BinesRaices.com 
      <a href="${BACKEND_URL}:${
      BACKEND_PORT ?? 3000
    }/auth/olvide-password/${token}">Confirmar tu cuenta</a> 
      </p>
      <p>Si tu no solicitaste el cambio de, puedes ignorar el mensaje</p>
    `,
  });
};

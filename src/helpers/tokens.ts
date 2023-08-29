import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../environments";

export const generarId = () =>
  Math.random().toString(32).substring(2) + Date.now().toString(32);

export const generarToken = (id: string) =>
  jwt.sign({ id }, TOKEN_KEY!, {
    expiresIn: "1d",
  });

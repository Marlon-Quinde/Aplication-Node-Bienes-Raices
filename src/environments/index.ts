import { config } from "dotenv";
config();

export const DB_NOMBRE = process.env.DB_NOMBRE!;
export const DB_USER = process.env.DB_USER!;
export const DB_PASS = process.env.DB_PASS!;
export const BACKEND_URL = process.env.BACKEND_URL;
export const BACKEND_PORT = process.env.BACKEND_PORT;

//Email
export const EMAIL_HOST = process.env.EMAIL_HOST;
export const EMAIL_PORT = process.env.EMAIL_PORT;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;

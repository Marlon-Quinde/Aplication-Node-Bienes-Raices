import { config } from "dotenv";
config();

export const DB_NAME = process.env.DB_NAME!;
export const DB_USER = process.env.DB_USER!;
export const DB_PASS = process.env.DB_PASS!;
export const DB_PORT = process.env.DB_PORT!;
export const DB_HOST = process.env.DB_HOST!;

export const BACKEND_URL = process.env.BACKEND_URL;
export const BACKEND_PORT = process.env.BACKEND_PORT;

//Email
export const EMAIL_HOST = process.env.EMAIL_HOST;
export const EMAIL_PORT = process.env.EMAIL_PORT;
export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;

//tokey key
export const TOKEN_KEY = process.env.TOKEN_KEY;
export const SIGNOZ_URL = process.env.SIGNOZ_URL
export const SIGNOZ_SERVICE_NAME = process.env.SIGNOZ_SERVICE_NAME

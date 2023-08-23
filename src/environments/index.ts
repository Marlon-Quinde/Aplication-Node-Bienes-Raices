import { config } from 'dotenv';
config();


export const DB_NOMBRE = process.env.DB_NOMBRE!;
export const DB_USER =process.env.DB_USER!;
export const DB_PASS = process.env.DB_PASS!;
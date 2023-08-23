import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { DB_NOMBRE, DB_PASS, DB_USER } from "../environments";

const db = new Sequelize(DB_NOMBRE, DB_USER, DB_PASS, {
  host: process.env.DB_HOST,
  port: 3306,
  dialect: "mysql",
  define: {
    timestamps: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 1000,
  },
});

export default db;

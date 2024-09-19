import { Sequelize } from "sequelize";
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER } from "../environments";

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: Number(DB_PORT),
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

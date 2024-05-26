import dotenv from "dotenv";

dotenv.config();

export const databaseConfig = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME || "ITs-playground",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
  },
  test: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME || "ITs-playground",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
  },
  production: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME || "ITs-playground",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
  },
};
